import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-lg border-2 border-black bg-white text-black shadow-sm shadow-red-950/20 dark:border-stone-200",
        compact ? "size-10" : "size-20",
        className
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-x-1/2 top-1 bottom-1 w-2 -translate-x-1/2 rounded-sm bg-[#b11226]" />
      <span className="absolute inset-y-1/2 left-1 right-1 h-2 -translate-y-1/2 rounded-sm bg-[#b11226]" />
      <span className="absolute inset-1 rounded-md border border-[#b08a2e]/70" />
      <span
        className={cn(
          "relative rounded bg-white/90 px-1 font-black leading-none tracking-normal",
          compact ? "text-xs" : "text-xl"
        )}
      >
        <span className="text-black">D</span>
        <span className="text-[#b11226]">M</span>
      </span>
    </span>
  );
}
