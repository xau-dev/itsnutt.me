import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title") || "Blog Post";
  const excerpt = searchParams.get("excerpt") || "";
  const date = searchParams.get("date") || "";
  const readTime = searchParams.get("readTime") || "";
  const tagsParam = searchParams.get("tags") || "";
  const tags = tagsParam ? tagsParam.split(",") : [];

  const origin = req.url ? new URL(req.url).origin : "https://itsnutt.me";

  // Fetch fonts via HTTP (public files are served statically)
  const [domaineFont, aeonikRegular] = await Promise.all([
    fetch(`${origin}/fonts/TestDomaineDisplayCondensed-Regular-BF66174a213eae4.otf`).then(
      (r) => r.arrayBuffer()
    ),
    fetch(`${origin}/fonts/Aeonik-Regular.ttf`).then((r) => r.arrayBuffer()),
  ]);

  // Grid: 64px spacing (63px gap + 1px line), matching site exactly
  const gridCols = Math.ceil(1200 / 64);
  const gridRows = Math.ceil(630 / 64);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000000",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Grid lines — vertical (every 64px) */}
        {Array.from({ length: gridCols }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              left: `${(i + 1) * 64}px`,
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
            }}
          />
        ))}

        {/* Grid lines — horizontal (every 64px) */}
        {Array.from({ length: gridRows }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: `${(i + 1) * 64}px`,
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
            }}
          />
        ))}

        {/* Top-right site branding */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "60px",
            fontSize: "18px",
            color: "#525252",
            fontFamily: "'Aeonik'",
            letterSpacing: "-0.02em",
          }}
        >
          itsnutt.me
        </div>

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "28px",
            zIndex: 1,
          }}
        >
          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 14px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    background: "rgba(255, 255, 255, 0.03)",
                    color: "#a3a3a3",
                    fontSize: "14px",
                    fontFamily: "'Aeonik'",
                    borderRadius: "15px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title — thinner weight (400) */}
          <h1
            style={{
              fontSize: "58px",
              fontFamily: "'Test Domaine Display Condensed'",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: "1000px",
            }}
          >
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p
              style={{
                fontSize: "22px",
                fontFamily: "'Aeonik'",
                color: "#a3a3a3",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "850px",
              }}
            >
              {excerpt}
            </p>
          )}
        </div>

        {/* Bottom row */}
        {(date || readTime) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "auto",
              paddingTop: "40px",
              zIndex: 1,
            }}
          >
            {date && (
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "'Aeonik'",
                  color: "#525252",
                }}
              >
                {date}
              </span>
            )}
            {date && readTime && (
              <span style={{ color: "#404040", fontSize: "16px" }}>•</span>
            )}
            {readTime && (
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "'Aeonik'",
                  color: "#525252",
                }}
              >
                {readTime}
              </span>
            )}
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Test Domaine Display Condensed",
          data: domaineFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Aeonik",
          data: aeonikRegular,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
