import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
const html = (remarkHtml as any).default || remarkHtml;
const gfm = (remarkGfm as any).default || remarkGfm;

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail?: string;
  contentHtml: string;
  headings: Heading[];
}

const postsDirectory = path.join(process.cwd(), "content", "blogs");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(html: string): { contentHtml: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const usedSlugs = new Set<string>();

  // Match h2 and h3 tags
  const headingRegex = /<h([23])>([^<]+)<\/h\1>/g;

  const contentHtml = html.replace(headingRegex, (match, level: string, text: string) => {
    let id = slugify(text);
    // Deduplicate slugs
    let counter = 1;
    const baseId = id;
    while (usedSlugs.has(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }
    usedSlugs.add(id);

    headings.push({ id, text: text.trim(), level: parseInt(level, 10) });
    return `<h${level} id="${id}">${text}</h${level}>`;
  });

  return { contentHtml, headings };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(gfm).use(html).process(content);
  const rawHtml = processedContent.toString();
  const { contentHtml, headings } = extractHeadings(rawHtml);

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: formatDate(data.date),
    readTime: data.readTime,
    tags: data.tags,
    thumbnail: data.thumbnail,
    contentHtml,
    headings,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const post = await getPostBySlug(slug);
        return post!;
      })
  );

  // Sort by date descending
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
