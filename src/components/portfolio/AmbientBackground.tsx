import { cn } from "@/lib/utils";

/**
 * Bright, airy backdrop for the light glassmorphism theme: a cool icy base
 * with soft sky / cyan / indigo blooms drifting behind the translucent panels.
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background",
        className,
      )}
    >
      <div className="absolute -top-48 -left-40 size-[38rem] rounded-full bg-sky-200/70 blur-[120px]" />
      <div className="absolute top-1/4 -right-44 size-[40rem] rounded-full bg-indigo-200/60 blur-[130px]" />
      <div className="absolute -bottom-52 left-1/4 size-[36rem] rounded-full bg-cyan-200/60 blur-[130px]" />
      <div className="absolute top-6 left-[45%] size-80 rounded-full bg-sky-100/90 blur-[100px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.9),transparent_45%)]" />
    </div>
  );
}
