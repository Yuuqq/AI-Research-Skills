/**
 * Post-build SSG step.
 *
 * For every category/skill route, emits a static `index.html` next to the
 * Vite build output, with route-specific <title>, <meta description>,
 * canonical and Open Graph tags injected. Also writes sitemap.xml + robots.txt.
 *
 * The actual app still hydrates client-side from main.tsx — these emitted
 * files only differ in the <head> tags, which is what crawlers and link
 * unfurlers (Google, Twitter, Slack, Discord) read.
 *
 * Configure the production hostname with the SITE_URL env var.
 *   SITE_URL=https://your-domain.example pnpm --filter @workspace/ai-skills-site run build
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { categories } from "../src/data/skills";
import { skillOutlines, type SkillOutline } from "../src/data/skillOutlines";
import { learningPaths } from "../src/data/learningPaths";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");
const DEFAULT_SITE = "https://ai-research-skills.replit.app";

if (!existsSync(DIST)) {
  console.error(`build-seo: ${DIST} not found — run \`vite build\` first.`);
  process.exit(1);
}

// SITE_URL is required for any deploy build — wrong canonical/sitemap URLs
// silently degrade indexing. Allow the default only with explicit opt-in
// (intended for local builds while developing the SEO pipeline itself).
// Don't rely on NODE_ENV: Vite's build doesn't set it on the Node process,
// so the production deploy command would silently slip through that check.
if (!process.env.SITE_URL && process.env.ALLOW_DEFAULT_SITE_URL !== "1") {
  console.error(
    "\nbuild-seo: SITE_URL is required.\n" +
      "  Set it to your deployed origin, e.g.\n" +
      "    SITE_URL=https://your-domain.example pnpm --filter @workspace/ai-skills-site run build\n" +
      "  For a local SEO-pipeline test against the default placeholder, set ALLOW_DEFAULT_SITE_URL=1.\n",
  );
  process.exit(1);
}
if (!process.env.SITE_URL) {
  console.warn(`build-seo: SITE_URL not set, using placeholder ${DEFAULT_SITE}`);
}
const SITE_URL = (process.env.SITE_URL ?? DEFAULT_SITE).replace(/\/$/, "");
const OG_IMAGE = `${SITE_URL}/opengraph.jpg`;

const TEMPLATE = readFileSync(join(DIST, "index.html"), "utf8");

const esc = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

interface Meta {
  title: string;
  description: string;
  url: string;
  type: "website" | "article";
}

function setOrInsertMetaByName(html: string, name: string, content: string): string {
  const tag = `<meta name="${name}" content="${esc(content)}" />`;
  const re = new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, "i");
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setOrInsertMetaByProp(html: string, prop: string, content: string): string {
  const tag = `<meta property="${prop}" content="${esc(content)}" />`;
  const re = new RegExp(`<meta\\s+property=["']${prop}["'][^>]*>`, "i");
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function setOrInsertCanonical(html: string, url: string): string {
  const tag = `<link rel="canonical" href="${esc(url)}" />`;
  const re = /<link\s+rel=["']canonical["'][^>]*>/i;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderHtml(m: Meta): string {
  let html = TEMPLATE;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(m.title)}</title>`);
  html = setOrInsertMetaByName(html, "description", m.description);
  html = setOrInsertCanonical(html, m.url);
  html = setOrInsertMetaByProp(html, "og:title", m.title);
  html = setOrInsertMetaByProp(html, "og:description", m.description);
  html = setOrInsertMetaByProp(html, "og:url", m.url);
  html = setOrInsertMetaByProp(html, "og:type", m.type);
  html = setOrInsertMetaByProp(html, "og:image", OG_IMAGE);
  html = setOrInsertMetaByName(html, "twitter:title", m.title);
  html = setOrInsertMetaByName(html, "twitter:description", m.description);
  html = setOrInsertMetaByName(html, "twitter:image", OG_IMAGE);
  return html;
}

function writeRoute(routePath: string, meta: Meta): void {
  const dir = routePath === "" ? DIST : join(DIST, routePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), renderHtml(meta));
}

function summarize(text: string, max = 200): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.7 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: number;
}
const sitemapEntries: SitemapEntry[] = [];

// Total skill count for accurate copy in meta tags.
const totalSkills = categories.reduce((n, c) => n + c.skills.length, 0);
const totalCategories = categories.length;

// Home
const homeDesc =
  `Curated bilingual (EN/ZH) reference for AI research libraries — training, fine-tuning, ` +
  `RAG, agents, evaluation, multimodal. ${totalSkills} skills across ${totalCategories} categories.`;
writeRoute("", {
  title: `AI Research Skills · ${totalSkills} libraries for modern AI research`,
  description: homeDesc,
  url: `${SITE_URL}/`,
  type: "website",
});
sitemapEntries.push({ loc: `${SITE_URL}/`, changefreq: "weekly", priority: 1.0 });

let categoryCount = 0;
let skillCount = 0;
let pathCount = 0;

for (const p of learningPaths) {
  const url = `${SITE_URL}/path/${p.id}`;
  writeRoute(`path/${p.id}`, {
    title: `${p.name.en} · Learning Path · AI Research Skills`,
    description: `${summarize(p.desc.en, 160)} A curated ${p.skills.length}-step path through ${p.skills.length} libraries.`,
    url,
    type: "article",
  });
  sitemapEntries.push({ loc: url, changefreq: "monthly", priority: 0.75 });
  pathCount++;
}

for (const cat of categories) {
  const catUrl = `${SITE_URL}/category/${cat.slug}`;
  writeRoute(`category/${cat.slug}`, {
    title: `${cat.label} · AI Research Skills`,
    description: `${cat.label} — ${cat.desc}. Browse ${cat.skills.length} curated libraries with install commands and integration notes.`,
    url: catUrl,
    type: "website",
  });
  sitemapEntries.push({ loc: catUrl, changefreq: "monthly", priority: 0.8 });
  categoryCount++;

  for (const sk of cat.skills) {
    const url = `${SITE_URL}/skill/${cat.slug}/${sk.slug}`;
    const outlineKey = `${cat.slug}/${sk.slug}`;
    const outline: SkillOutline | undefined = (skillOutlines as Record<string, SkillOutline>)[outlineKey];
    const description = outline?.what?.en
      ? summarize(outline.what.en, 200)
      : summarize(sk.desc, 200);
    writeRoute(`skill/${cat.slug}/${sk.slug}`, {
      title: `${sk.name} · ${cat.label} · AI Research Skills`,
      description,
      url,
      type: "article",
    });
    sitemapEntries.push({ loc: url, changefreq: "monthly", priority: 0.7 });
    skillCount++;
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapEntries
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

writeFileSync(
  join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

console.log(
  `build-seo: wrote ${1 + categoryCount + skillCount + pathCount} static pages ` +
    `(1 home + ${categoryCount} categories + ${skillCount} skills + ${pathCount} learning paths) ` +
    `+ sitemap.xml + robots.txt — SITE_URL=${SITE_URL}`,
);
