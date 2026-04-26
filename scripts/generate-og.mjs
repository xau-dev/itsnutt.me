import { chromium } from 'playwright';
import { readdir, readFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'og');

// Dark theme matching your portfolio
const theme = {
  base:     '#000000',
  surface:  '#171717',
  border:   '#262626',
  text:     '#ededed',
  subtext:  '#a3a3a3',
  accent:   '#ffffff',
};

function fontSize(title) {
  if (title.length <= 40)  return '64px';
  if (title.length <= 70)  return '52px';
  if (title.length <= 100) return '44px';
  return '36px';
}

function card(title) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: ${theme.base};
      background-image: 
        repeating-linear-gradient(to right, transparent, transparent 63px, rgba(255,255,255,0.03) 63px, rgba(255,255,255,0.03) 64px),
        repeating-linear-gradient(to bottom, transparent, transparent 63px, rgba(255,255,255,0.03) 63px, rgba(255,255,255,0.03) 64px);
      display: flex;
      flex-direction: column;
      padding: 80px 96px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow: hidden;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 60px;
      flex-shrink: 0;
    }
    .logo {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: ${theme.surface};
      border: 1px solid ${theme.border};
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.text};
      font-size: 20px;
      font-weight: 700;
    }
    .site-name {
      color: ${theme.subtext};
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -0.02em;
    }
    .title {
      color: ${theme.text};
      font-size: ${fontSize(title)};
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.03em;
      flex: 1;
      display: flex;
      align-items: center;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid ${theme.border};
      padding-top: 32px;
      margin-top: 48px;
      flex-shrink: 0;
    }
    .domain { color: ${theme.subtext}; font-size: 18px; font-weight: 500; }
    .author { color: ${theme.text}; font-size: 18px; font-weight: 600; }
    .tag {
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      border: 1px solid ${theme.border};
      background: ${theme.surface};
      border-radius: 8px;
      color: ${theme.subtext};
      font-size: 14px;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">N</div>
    <div class="site-name">itsnutt.me</div>
  </div>
  <div class="title">${title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}</div>
  <div class="footer">
    <div class="domain">itsnutt.me</div>
    <div class="author">xaudev</div>
  </div>
</body>
</html>`;
}

async function findMarkdown(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await findMarkdown(full));
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function parseFrontMatter(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  const m = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const yaml = m[1];
  const title = yaml.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];
  const slug  = yaml.match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1];
  const draft = /^draft:\s*true/m.test(yaml);
  return { title, slug, draft };
}

function getSlug(filePath, fm) {
  if (fm.slug) return fm.slug;
  return path.basename(filePath, '.md');
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await findMarkdown(CONTENT_DIR);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });

  let generated = 0;

  for (const file of files) {
    const raw = await readFile(file, 'utf-8');
    const fm = parseFrontMatter(raw);

    if (!fm.title || fm.draft) continue;

    const slug = getSlug(file, fm);
    const out  = path.join(OUTPUT_DIR, `${slug}.png`);

    process.stdout.write(`  ${slug} ... `);
    await page.setContent(card(fm.title), { waitUntil: 'networkidle' });
    await page.screenshot({ path: out, type: 'png' });
    console.log('done');
    generated++;
  }

  await browser.close();
  console.log(`\ngenerated ${generated} image${generated !== 1 ? 's' : ''} → public/images/og/`);
}

main().catch(err => { console.error(err); process.exit(1); });
