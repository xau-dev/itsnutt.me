import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blogs";
import ScrollReveal from "../components/ScrollReveal";
import SkeletonImage from "../components/SkeletonImage";
import Footer from "../components/Footer";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail?: string;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const hasThumbnail = !!post.thumbnail;

  return (
    <ScrollReveal direction="up" delay={0.05 * index}>
      <Link href={`/blogs/${post.slug}`}>
        <article
          className={`group border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm overflow-hidden hover:border-neutral-700 transition-all duration-300 h-full flex flex-col ${
            hasThumbnail ? "" : "p-4 sm:p-5"
          }`}
          style={{ borderRadius: "15px" }}
        >
          {/* Thumbnail */}
          {hasThumbnail && (
            <div className="relative aspect-[16/10] overflow-hidden">
              <SkeletonImage
                src={post.thumbnail!}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />

              {/* Date badge on thumbnail */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span
                  className="px-2.5 py-0.5 bg-neutral-900/80 backdrop-blur-sm text-neutral-300 text-xs"
                  style={{ borderRadius: "12px", fontFamily: "var(--font-aeonik)" }}
                >
                  {post.date}
                </span>
              </div>
            </div>
          )}

          <div className={hasThumbnail ? "p-4 sm:p-5" : ""}>
            {/* Date/Read time for non-thumbnail cards */}
            {!hasThumbnail && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-neutral-500 text-xs" style={{ fontFamily: "var(--font-aeonik)" }}>
                  {post.date}
                </span>
                <span className="text-neutral-700">•</span>
                <span className="text-neutral-500 text-xs" style={{ fontFamily: "var(--font-aeonik)" }}>
                  {post.readTime}
                </span>
              </div>
            )}

            <h2
              className="text-white text-base sm:text-lg font-medium mb-2 group-hover:text-neutral-300 transition-colors leading-snug line-clamp-2"
              style={{ fontFamily: "var(--font-aeonik)" }}
            >
              {post.title}
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-3 flex-1 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs hover:border-neutral-700 hover:text-neutral-300 transition-colors"
                    style={{ borderRadius: "12px", fontFamily: "var(--font-aeonik)" }}
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-neutral-600 text-xs">+{post.tags.length - 2}</span>
                )}
              </div>

              {hasThumbnail && (
                <span className="text-neutral-500 text-xs" style={{ fontFamily: "var(--font-aeonik)" }}>
                  {post.readTime}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </ScrollReveal>
  );
}

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-full bg-grid-lines relative">
      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        <ScrollReveal direction="up">
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-white transition-colors mb-8"
              style={{ fontFamily: "var(--font-aeonik)" }}
            >
              <span>←</span> Back to home
            </Link>

            <h1
              className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-4"
              style={{ fontFamily: "var(--font-domaine-condensed)" }}
            >
              Blog
            </h1>
            <p className="text-neutral-400 text-lg" style={{ fontFamily: "var(--font-aeonik)" }}>
              Thoughts on robotics, security, and building things
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
