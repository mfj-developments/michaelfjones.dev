import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const { width, height } = size;
  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          color: "#F6FAFD",
          background: "#0A1931",
          backgroundImage:
            "radial-gradient(800px 400px at 90% -10%, rgba(179,207,229,0.35) 0%, transparent 55%),radial-gradient(900px 500px at 10% -20%, rgba(74,127,167,0.35) 0%, transparent 60%)",
          padding: 64,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: -0.5,
          }}
        >
          Michael F. Jones — Developer
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            opacity: 0.9,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Frontend‑leaning full‑stack developer in Fayetteville, AR. Clean UI,
          performance, and production‑grade web apps.
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          {[
            "Next.js",
            "TypeScript",
            "Tailwind",
            "shadcn/ui",
            "Supabase",
          ].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 20,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(246,250,253,0.15)",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}

