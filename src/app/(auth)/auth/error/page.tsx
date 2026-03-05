import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-4">
      <div className="glass-panel p-8 w-full max-w-sm text-center animate-fade-in-up">
        <h1 className="text-2xl font-bold gradient-text mb-2">Access Denied</h1>
        <p className="text-text-secondary text-sm mb-6">
          You must use a <strong>@holidayextras.com</strong> Google account to sign in.
        </p>
        <Link
          href="/auth/signin"
          className="inline-block rounded-full bg-hx-purple text-white font-semibold py-3 px-6 hover:bg-hx-purple-light transition-colors"
        >
          Try again
        </Link>
      </div>
    </div>
  );
}
