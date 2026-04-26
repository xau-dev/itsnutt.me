import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blogs";
import ScrollReveal from "../../components/ScrollReveal";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} | Nutt`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-full bg-grid-lines relative">
      <div className="max-w-[900px] mx-auto relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
        <ScrollReveal direction="up">
          <div className="mb-12">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-neutral-500 text-sm hover:text-white transition-colors mb-8"
              style={{ fontFamily: "var(--font-aeonik)" }}
            >
              <span>←</span> Back to blogs
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-neutral-500 text-sm" style={{ fontFamily: "var(--font-aeonik)" }}>
                {post.date}
              </span>
              <span className="text-neutral-700">•</span>
              <span className="text-neutral-500 text-sm" style={{ fontFamily: "var(--font-aeonik)" }}>
                {post.readTime}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight mb-6"
              style={{ fontFamily: "var(--font-domaine-condensed)" }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs"
                  style={{ borderRadius: "15px", fontFamily: "var(--font-aeonik)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <article
            className="prose prose-invert prose-neutral max-w-none blog-content"
            style={{ fontFamily: "var(--font-aeonik)" }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </ScrollReveal>
      </div>
    </div>
  );
}
