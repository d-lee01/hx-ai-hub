"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CAPABILITIES } from "@/lib/constants";
import { CapabilityPill } from "./CapabilityPill";

export function CapabilityFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCaps = searchParams.get("cap")?.split(",").filter(Boolean) ?? [];

  const toggle = useCallback(
    (cap: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get("cap")?.split(",").filter(Boolean) ?? [];

      if (current.includes(cap)) {
        const next = current.filter((c) => c !== cap);
        if (next.length > 0) {
          params.set("cap", next.join(","));
        } else {
          params.delete("cap");
        }
      } else {
        params.set("cap", [...current, cap].join(","));
      }

      router.push(`/tools?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {CAPABILITIES.map((cap) => (
        <CapabilityPill
          key={cap}
          label={cap}
          active={activeCaps.includes(cap)}
          onClick={() => toggle(cap)}
        />
      ))}
    </div>
  );
}
