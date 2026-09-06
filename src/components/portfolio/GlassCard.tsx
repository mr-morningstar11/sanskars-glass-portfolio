import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Colored ambient glow under the panel (restrained, cool tones only). */
  glow?: "none" | "indigo" | "cyan";
};

/**
 * Layered translucent light-glass panel: white gradient fill, controlled
 * backdrop blur, a crisp inner top edge highlight and a soft cool shadow.
 */
export function GlassCard({
  className,
  glow = "none",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel",
        glow === "indigo" && "glass-glow-indigo",
        glow === "cyan" && "glass-glow-cyan",
        className,
      )}
      {...props}
    />
  );
}
