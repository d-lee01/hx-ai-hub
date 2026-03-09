# Skill: Google OAuth with NextAuth.js v5 + Prisma (Next.js App Router)

This is a reusable skill file for setting up Google OAuth authentication in a Next.js App Router project using NextAuth.js v5 (Auth.js) and Prisma ORM with PostgreSQL.

---

## 1. Install Dependencies

```bash
npm install next-auth@beta @auth/prisma-adapter @prisma/client prisma
```

> NextAuth v5 is published under the `@beta` tag. Use `next-auth@beta` (not `next-auth@latest`).

---

## 2. Prisma Schema — Auth Tables

Add these models to `prisma/schema.prisma`. They are required by `@auth/prisma-adapter`:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

Then run:

```bash
npx prisma migrate dev --name add-auth-tables
```

---

## 3. Prisma Client Singleton

Create `src/lib/db/prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

This prevents multiple Prisma instances during Next.js hot reload.

---

## 4. Auth Configuration

Create `src/lib/auth/auth.ts`:

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = profile?.email ?? "";
        // OPTIONAL: Restrict to a specific domain
        // Remove or adjust this check if you want to allow all Google accounts
        if (process.env.ALLOW_ALL_DOMAINS === "true") return true;
        return email.endsWith("@yourdomain.com");
      }
      return true;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
```

**Key exports:** `handlers` (route handler), `auth` (get session server-side), `signIn` (trigger sign-in), `signOut` (trigger sign-out).

---

## 5. Route Handler

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from "@/lib/auth/auth";

export const { GET, POST } = handlers;
```

This single file handles all auth endpoints: `/api/auth/signin`, `/api/auth/callback/google`, `/api/auth/session`, `/api/auth/signout`, etc.

---

## 6. Middleware — Route Protection

Create `src/middleware.ts` at the project root:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes — no auth required
  const publicPaths = ["/auth", "/api/auth"];
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check for NextAuth session cookie
  const sessionCookie =
    req.cookies.get("authjs.session-token") ??
    req.cookies.get("__Secure-authjs.session-token");

  if (!sessionCookie) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

**Notes:**
- `authjs.session-token` is used in development (HTTP).
- `__Secure-authjs.session-token` is used in production (HTTPS).
- Add any public API routes to `publicPaths` (e.g. `/api/bot`).

---

## 7. Session Provider

Create `src/components/layout/Providers.tsx`:

```typescript
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Wrap your root layout with it in `src/app/layout.tsx`:

```typescript
import { Providers } from "@/components/layout/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## 8. Sign-In Page

Create `src/app/auth/signin/page.tsx` (or under a route group like `(auth)`):

```typescript
import { signIn } from "@/lib/auth/auth";

export default function SignInPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <div className="p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Sign In</h1>
        <p className="text-sm mb-6">Sign in with your Google account</p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button type="submit">Sign in with Google</button>
        </form>
      </div>
    </div>
  );
}
```

**Important:** The sign-in uses a Server Action (`"use server"`), not a client-side `onClick`. Change `redirectTo` to your preferred post-login page.

---

## 9. Error Page

Create `src/app/auth/error/page.tsx`:

```typescript
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <div className="p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-sm mb-6">
          You are not authorised to sign in.
        </p>
        <Link href="/auth/signin">Try again</Link>
      </div>
    </div>
  );
}
```

---

## 10. Using Session Data

### Server Components (recommended)

```typescript
import { auth } from "@/lib/auth/auth";

export default async function SomePage() {
  const session = await auth();
  // session?.user?.name, session?.user?.email, session?.user?.image
}
```

### Client Components

```typescript
"use client";
import { useSession, signOut } from "next-auth/react";

export function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div>
      <img src={session.user.image!} alt="" referrerPolicy="no-referrer" />
      <span>{session.user.name}</span>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
```

> Always add `referrerPolicy="no-referrer"` to Google profile images — they return 403 without it.

---

## 11. Environment Variables

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Google OAuth — get these from https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="xxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxx"

# NextAuth
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"          # Set to production URL in prod

# Optional: domain restriction bypass for development
ALLOW_ALL_DOMAINS="true"
```

---

## 12. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new OAuth 2.0 Client ID (Web application)
3. **Authorized JavaScript origins:**
   - `http://localhost:3000` (dev)
   - `https://yourdomain.com` (prod)
4. **Authorized redirect URIs:**
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://yourdomain.com/api/auth/callback/google` (prod)
5. Copy the Client ID and Client Secret into your `.env.local`

---

## 13. Vercel Deployment Checklist

1. Add all env vars to Vercel project settings (DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL)
2. Set `NEXTAUTH_URL` to your production URL (e.g. `https://yourdomain.vercel.app`)
3. Set `ALLOW_ALL_DOMAINS` to `"false"` if using domain restriction
4. Add `"postinstall": "prisma generate"` to `package.json` scripts (ensures Prisma client regenerates on deploy)
5. Run `prisma migrate deploy` against the production database
6. Add the production URL + `/api/auth/callback/google` to Google Console redirect URIs

---

## 14. File Structure Summary

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts   ← Route handler
│   ├── auth/signin/page.tsx               ← Sign-in page
│   ├── auth/error/page.tsx                ← Error page
│   └── layout.tsx                         ← Wraps with Providers
├── components/layout/
│   └── Providers.tsx                      ← SessionProvider wrapper
├── lib/
│   ├── auth/auth.ts                       ← NextAuth config (core)
│   └── db/prisma.ts                       ← Prisma singleton
├── middleware.ts                           ← Route protection
prisma/
└── schema.prisma                          ← Auth tables
.env.local                                 ← Secrets (never commit)
```

---

## 15. Auth Flow

```
User visits protected route
  → Middleware checks for session cookie
  → No cookie → redirect to /auth/signin?callbackUrl=/original-path
  → User clicks "Sign in with Google"
  → Server Action calls signIn("google")
  → Redirect to Google consent screen
  → User authorises → Google redirects to /api/auth/callback/google
  → NextAuth signIn callback validates email domain (if configured)
  → Pass: creates User + Account + Session in DB, sets cookie, redirects to callbackUrl
  → Fail: redirects to /auth/error
```
