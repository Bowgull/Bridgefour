"use client";

type PlaceholderProps = {
  label: string;
  aspect?: "video" | "screen" | "wide" | "square";
  className?: string;
};

const aspectMap = {
  video: "aspect-video",
  screen: "aspect-[9/19.5]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

export default function Placeholder({
  label,
  aspect = "wide",
  className = "",
}: PlaceholderProps) {
  return (
    <div
      className={`${aspectMap[aspect]} w-full flex flex-col items-center justify-center border border-dashed rounded-sm ${className}`}
      style={{ borderColor: "var(--foreground-dim)", background: "var(--background-elev)" }}
    >
      <span className="mono text-xs" style={{ color: "var(--foreground-dim)" }}>
        {label}
      </span>
    </div>
  );
}
