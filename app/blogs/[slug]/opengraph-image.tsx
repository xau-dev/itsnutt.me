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
  if (t.length <= 40) return 58;
  if (t.length <= 70) return 50;
  if (t.length <= 100) return 42;
  return 34;
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
    path.join(fontDir, "TestDomaineDisplayCondensed-Regular-BF66174a213eae4.otf")
  );
  const aeonikFont = fs.readFileSync(
    path.join(fontDir, "Aeonik-Regular.ttf")
  );

  // Grid: 64px spacing matching site bg-grid-lines
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
          fontFamily: "'Aeonik', sans-serif",
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
            gap: "28px",
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
              fontWeight: 400,
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
                color: "#a3a3a3",
                fontSize: "22px",
                fontFamily: "'Aeonik', sans-serif",
                lineHeight: 1.5,
                maxWidth: "850px",
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
            gap: "12px",
            marginTop: "auto",
            paddingTop: "40px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
          >
            {date && (
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "'Aeonik', sans-serif",
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
                  fontFamily: "'Aeonik', sans-serif",
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
      width: size.width,
      height: size.height,
      fonts: [
        {
          name: "Test Domaine Display Condensed",
          data: domaineFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Aeonik",
          data: aeonikFont,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
