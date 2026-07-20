import { Crown } from "lucide-react";

import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-lg border border-yellow-300 bg-[#00145f] text-white shadow-sm shadow-red-950/20",
        compact ? "size-10" : "size-20",
        className
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[linear-gradient(135deg,#090909_0%,#090909_45%,#9b0000_46%,#9b0000_100%)]" />
      <span className="absolute inset-x-2 bottom-2 h-1 rounded-full bg-yellow-300" />
      <Crown
        size={compact ? 16 : 28}
        className="relative mb-0.5 text-yellow-300"
        strokeWidth={2.4}
      />
      <span className={cn("relative font-black leading-none", compact ? "text-xs" : "text-xl")}>
        DM
      </span>
    </span>
  );
}
