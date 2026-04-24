import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Bridge Four — Josh Bocas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0b0a08";
const FG = "#f2ece0";
const FG_MUTED = "#8a8378";
const FG_DIM = "#5c574f";
const GOLD = "#E8C860";
const GREEN = "#6AD7A3";

export default async function Image() {
  const [cinzel, mono] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_fonts/Cinzel-SemiBold.woff")),
    readFile(join(process.cwd(), "src/app/_fonts/GeistMono-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: BG,
          color: FG,
          fontFamily: "Geist Mono",
          position: "relative",
        }}
      >
        {/* Ambient dual glow — same recipe as the site's hero */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(720px 380px at 12% 18%, rgba(106, 215, 163, 0.18), transparent 65%), radial-gradient(820px 420px at 88% 78%, rgba(232, 200, 96, 0.20), transparent 65%)",
            display: "flex",
          }}
        />

        {/* Eyebrow: signal-rule + BRIDGE FOUR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 56,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${GOLD})`,
              display: "flex",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: GOLD,
              boxShadow: `0 0 14px ${GOLD}`,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: FG_MUTED,
              marginLeft: 4,
            }}
          >
            Bridge Four
          </div>
        </div>

        {/* Headline group — left-anchored, generous breathing room */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
            marginTop: -20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "0.42em",
              fontFamily: "Cinzel",
              fontSize: 148,
              lineHeight: 0.95,
              letterSpacing: "0.04em",
              fontWeight: 600,
            }}
          >
            <span style={{ color: FG }}>Josh</span>
            <span style={{ color: GOLD }}>Bocas</span>
          </div>

          {/* Gradient hairline — gold → green, mirroring rule-accent */}
          <div
            style={{
              width: 520,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${GOLD}88, ${GREEN}88, transparent)`,
              display: "flex",
            }}
          />
        </div>

        {/* Footer: positioning left, url right */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: FG_DIM,
            }}
          >
            Toronto · Fintech AM · Solo builder
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.12em",
              color: FG_MUTED,
            }}
          >
            bridgefour-jb.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cinzel",
          data: cinzel,
          weight: 600,
          style: "normal",
        },
        {
          name: "Geist Mono",
          data: mono,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
