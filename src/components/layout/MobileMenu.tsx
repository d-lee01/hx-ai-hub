"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-background shadow-xl p-6 flex flex-col animate-fade-in-up">
        <button
          onClick={onClose}
          className="self-end p-2 mb-4 cursor-pointer"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col gap-2">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  active
                    ? "bg-hx-purple text-white"
                    : "text-text-secondary hover:bg-black/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {session?.user && (
          <div className="mt-auto pt-6 border-t border-glass-border flex items-center gap-3">
            {session.user.image && (
              <img
                src={session.user.image}
                alt=""
                className="w-8 h-8 rounded-full"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{session.user.name}</p>
              <button
                onClick={() => signOut()}
                className="text-xs text-text-secondary hover:text-foreground transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
