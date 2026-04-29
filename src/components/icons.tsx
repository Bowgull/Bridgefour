type MarkProps = {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Top-right corner bracket. Echoes the .bracket section-marker motif
 * to signal "opens elsewhere." Hairline 1px via non-scaling stroke.
 */
export function ExternalMark({ size = "0.7em", className, style }: MarkProps) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 10 10"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      className={`ext-mark${className ? ` ${className}` : ""}`}
      style={{
        display: "inline-block",
        marginLeft: "0.4em",
        verticalAlign: "0.06em",
        flexShrink: 0,
        ...style,
      }}
    >
      <path
        d="M3 2 H9 V8"
        strokeWidth="1"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
