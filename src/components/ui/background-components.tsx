import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  className?: string;
}

export const BackgroundGlow = ({ className }: BackgroundGlowProps) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Soft Yellow Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #FFF991 0%, transparent 70%)
          `,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
};


