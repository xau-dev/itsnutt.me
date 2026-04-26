import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getPostMeta(slug: string) {
  const fullPath = path.join(process.cwd(), "content", "blogs", `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const file = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(file);
  return {
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    readTime: data.readTime as string,
    tags: (data.tags as string[]) || [],
    thumbnail: data.thumbnail as string | undefined,
  };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const post = getPostMeta(slug);
  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const fontDir = path.join(process.cwd(), "public", "fonts");

  const domaineFont = fs.readFileSync(
    path.join(fontDir, "TestDomaineDisplayCondensed-Semibold-BF66174a2168254.otf")
  );
  const aeonikRegular = fs.readFileSync(
    path.join(fontDir, "Aeonik-Regular.ttf")
  );
  const aeonikMedium = fs.readFileSync(
    path.join(fontDir, "Aeonik-Medium.ttf")
  );

  const gridBg = `
    repeating-linear-gradient(
      to right,
      transparent,
      transparent 63px,
      rgba(255, 255, 255, 0.03) 63px,
      rgba(255, 255, 255, 0.03) 64px
    ),
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 63px,
      rgba(255, 255, 255, 0.03) 63px,
      rgba(255, 255, 255, 0.03) 64px
    )
  `;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000000",
          backgroundImage: gridBg,
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Top-right site branding */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "60px",
            fontSize: "18px",
            color: "#737373",
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
            gap: "24px",
          }}
        >
          {/* Tags */}
          {post.tags.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {post.tags.slice(0, 4).map((tag) => (
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

          {/* Title */}
          <h1
            style={{
              fontSize: "56px",
              fontFamily: "'Test Domaine Display Condensed'",
              fontWeight: 600,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            style={{
              fontSize: "22px",
              fontFamily: "'Aeonik'",
              color: "#a3a3a3",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "800px",
            }}
          >
            {post.excerpt}
          </p>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "auto",
            paddingTop: "40px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontFamily: "'Aeonik'",
              color: "#737373",
            }}
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span style={{ color: "#404040", fontSize: "16px" }}>•</span>
          <span
            style={{
              fontSize: "16px",
              fontFamily: "'Aeonik'",
              color: "#737373",
            }}
          >
            {post.readTime}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Test Domaine Display Condensed",
          data: domaineFont,
          weight: 600,
          style: "normal",
        },
        {
          name: "Aeonik",
          data: aeonikRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Aeonik",
          data: aeonikMedium,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
