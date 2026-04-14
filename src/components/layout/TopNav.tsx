"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { SECTIONS } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";

const navLinks = Object.values(SECTIONS).map((s) => ({
  label: s.label,
  href: `/${s.slug}`,
}));

export function TopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur" role="navigation">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-4">
          <Link href="/" className="shrink-0">
            <Image src="/hassle-away-logo.png" alt="HX AI Hub" width={270} height={180} className="h-18 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    active
                      ? "bg-hx-purple text-white"
                      : "text-text-secondary hover:text-foreground hover:bg-white/8"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {session?.user && (
              <div className="hidden md:flex items-center gap-3">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-8 h-8 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm text-text-secondary hover:text-foreground transition-colors cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}
