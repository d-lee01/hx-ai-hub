"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { AT_HX_THEMES } from "@/lib/constants";
import { CapabilityPill } from "./CapabilityPill";

export function ThemeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeThemes = searchParams.get("theme")?.split(",").filter(Boolean) ?? [];

  const toggle = useCallback(
    (theme: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get("theme")?.split(",").filter(Boolean) ?? [];

      if (current.includes(theme)) {
        const next = current.filter((t) => t !== theme);
        if (next.length > 0) {
          params.set("theme", next.join(","));
        } else {
          params.delete("theme");
        }
      } else {
        params.set("theme", [...current, theme].join(","));
      }

      router.push(`/at-hx?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {AT_HX_THEMES.map((theme) => (
        <CapabilityPill
          key={theme}
          label={theme}
          active={activeThemes.includes(theme)}
          onClick={() => toggle(theme)}
        />
      ))}
    </div>
  );
}
