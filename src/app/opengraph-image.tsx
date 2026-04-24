import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bridge Four — Josh Bocas. Two AI products, shipped solo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0a08",
          backgroundImage:
            "radial-gradient(900px 500px at 10% 0%, rgba(106,215,163,0.22), transparent 60%), radial-gradient(900px 500px at 100% 100%, rgba(232,200,96,0.22), transparent 60%)",
          color: "#f2ece0",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#E8C860",
              boxShadow: "0 0 24px #E8C860",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#f2ece0",
            }}
          >
            Bridge Four
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#f2ece0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Josh Bocas.</span>
            <span style={{ color: "#E8C860" }}>
              Two AI products, shipped solo.
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#a09688",
              maxWidth: 940,
              fontFamily: "sans-serif",
            }}
          >
            Sygnalist, a ranked job radar. Waymark, a coach that reads the
            pattern and rewrites the week.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#5c574f",
            fontFamily: "monospace",
          }}
        >
          <span>bridgefour.co</span>
          <span style={{ color: "#6AD7A3" }}>Still building.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
