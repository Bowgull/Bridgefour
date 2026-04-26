"use client";

import Image from "next/image";

type Props = {
  kind: "phone" | "browser";
  src?: string;
  alt?: string;
  label?: string;
  url?: string;
  accent?: string;
  hideChrome?: boolean;
  aspectRatio?: string;
};

export default function DeviceFrame({
  kind,
  src,
  alt = "",
  label,
  url = "sygnalist.co",
  accent,
  hideChrome = true,
  aspectRatio = "780 / 1688",
}: Props) {
  if (kind === "phone") {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 260,
          margin: "0 auto",
          padding: 8,
          borderRadius: 36,
          background: "linear-gradient(180deg, #1d1b17 0%, #0d0c0a 100%)",
          boxShadow: accent
            ? `inset 0 0 0 1px ${accent}33, 0 30px 60px -30px rgba(0,0,0,0.8)`
            : "inset 0 0 0 1px rgba(232, 200, 96, 0.15), 0 30px 60px -30px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio,
            borderRadius: 28,
            overflow: "hidden",
            background: "var(--waymark-bg)",
          }}
        >
          {src ? (
            <Image src={src} alt={alt} fill className="object-contain" sizes="260px" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 text-center">
              <span
                className="mono uppercase"
                style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(232, 200, 96, 0.65)" }}
              >
                Waymark
              </span>
              {label && (
                <span className="mono" style={{ fontSize: 10, color: "rgba(242, 236, 224, 0.35)" }}>
                  {label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        background: "#0e1218",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.8)",
      }}
    >
      {!hideChrome && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 14px",
            background: "#0b0f14",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#ff5f57" }} />
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#febc2e" }} />
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#28c840" }} />
          <span
            className="mono"
            style={{ marginLeft: 12, fontSize: 11, color: "#5c6470", letterSpacing: "0.04em" }}
          >
            {url}
          </span>
        </div>
      )}
      <div
        style={{
          position: "relative",
          aspectRatio: "2880 / 1454",
          background: "var(--sygnalist-bg)",
        }}
      >
        {src ? (
          <Image src={src} alt={alt} fill className="object-contain" sizes="(min-width: 768px) 600px, 100vw" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-4 text-center">
            <span
              className="mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(106, 215, 163, 0.7)" }}
            >
              Sygnalist
            </span>
            {label && (
              <span className="mono" style={{ fontSize: 10, color: "rgba(242, 236, 224, 0.35)" }}>
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
