/** @jsxImportSource react */
import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content", "blogs");
  const slugs: string[] = [];

  if (fs.existsSync(postsDir)) {
    for (const file of fs.readdirSync(postsDir)) {
      if (file.endsWith(".md")) {
        slugs.push(file.replace(".md", ""));
      }
    }
  }

  return slugs.map((slug) => ({ slug }));
}

export const alt = "itsnutt.me blog post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fontSize(t: string): number {
  if (t.length <= 30) return 84;
  if (t.length <= 55) return 72;
  if (t.length <= 80) return 60;
  return 48;
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const postsDir = path.join(process.cwd(), "content", "blogs");
  const mdPath = path.join(postsDir, `${slug}.md`);

  let title = slug.replace(/-/g, " ");
  let excerpt = "";
  let date = "";
  let readTime = "";
  let tags: string[] = [];

  if (fs.existsSync(mdPath)) {
    const raw = fs.readFileSync(mdPath, "utf8");
    const { data } = matter(raw);
    title = String(data.title || slug);
    excerpt = String(data.excerpt || "");
    date = data.date ? formatDate(data.date) : "";
    readTime = String(data.readTime || "");
    tags = Array.isArray(data.tags) ? data.tags : [];
  }

  const fontDir = path.join(process.cwd(), "public", "fonts");

  const domaineFont = fs.readFileSync(
    path.join(fontDir, "TestDomaineDisplayCondensed-Semibold-BF66174a2168254.otf")
  );
  const aeonikFont = fs.readFileSync(
    path.join(fontDir, "Aeonik-Medium.ttf")
  );

  // Sparse grid: every 128px for cleaner look
  const gridStep = 128;
  const gridCols = Math.ceil(1200 / gridStep);
  const gridRows = Math.ceil(630 / gridStep);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000000",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "'Aeonik', sans-serif",
        }}
      >
        {/* Grid lines — vertical (every 128px) */}
        {Array.from({ length: gridCols }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              left: `${(i + 1) * gridStep}px`,
              top: 0,
              bottom: 0,
              width: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            }}
          />
        ))}

        {/* Grid lines — horizontal (every 128px) */}
        {Array.from({ length: gridRows }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: `${(i + 1) * gridStep}px`,
              left: 0,
              right: 0,
              height: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            }}
          />
        ))}

        {/* Top-right site branding */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            right: "80px",
            fontSize: "28px",
            color: "#a3a3a3",
            fontFamily: "'Aeonik', sans-serif",
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
            gap: "32px",
          }}
        >
          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 20px",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "#e5e5e5",
                    fontSize: "22px",
                    fontFamily: "'Aeonik', sans-serif",
                    borderRadius: "15px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              color: "#ffffff",
              fontSize: fontSize(title),
              fontFamily: "'Test Domaine Display Condensed', serif",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>

          {/* Excerpt */}
          {excerpt && (
            <div
              style={{
                color: "#d4d4d4",
                fontSize: "32px",
                fontFamily: "'Aeonik', sans-serif",
                lineHeight: 1.5,
                maxWidth: "900px",
              }}
            >
              {excerpt}
            </div>
          )}
        </div>

        {/* Bottom row */}
        {(date || readTime) && (
          <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "auto",
            paddingTop: "36px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          >
            {date && (
              <span
                style={{
                  fontSize: "24px",
                  fontFamily: "'Aeonik', sans-serif",
                  color: "#d4d4d4",
                }}
              >
                {date}
              </span>
            )}
            {date && readTime && (
              <span style={{ color: "#737373", fontSize: "24px" }}>•</span>
            )}
            {readTime && (
              <span
                style={{
                  fontSize: "24px",
                  fontFamily: "'Aeonik', sans-serif",
                  color: "#d4d4d4",
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
      width: size.width,
      height: size.height,
      fonts: [
        {
          name: "Test Domaine Display Condensed",
          data: domaineFont,
          weight: 600,
          style: "normal",
        },
        {
          name: "Aeonik",
          data: aeonikFont,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
