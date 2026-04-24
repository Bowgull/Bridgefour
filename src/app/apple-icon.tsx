import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: "#0b0a08",
          backgroundImage:
            "radial-gradient(120px 80px at 50% 30%, rgba(232,200,96,0.28), transparent 70%)",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            background: "#E8C860",
            boxShadow: "0 0 36px #E8C860",
          }}
        />
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#f2ece0",
            fontFamily: "serif",
          }}
        >
          B4
        </div>
      </div>
    ),
    { ...size }
  );
}
