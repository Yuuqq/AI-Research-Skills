import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..', '..');
const SITE_DIR = resolve(__dirname, '..');
const CONTENT_DIR = join(SITE_DIR, 'src', 'content', 'docs');
const SIDEBAR_PATH = join(SITE_DIR, 'src', 'sidebar.ts');

const CATEGORY_COLORS = {
  '0-autoresearch-skill': '#F59E0B',
  '01-model-architecture': '#6366F1',
  '02-tokenization': '#818CF8',
  '03-fine-tuning': '#A855F7',
  '04-mechanistic-interpretability': '#C084FC',
  '05-data-processing': '#22D3EE',
  '06-post-training': '#34D399',
  '07-safety-alignment': '#F43F5E',
  '08-distributed-training': '#6366F1',
  '09-infrastructure': '#818CF8',
  '10-optimization': '#F59E0B',
  '11-evaluation': '#22D3EE',
  '12-inference-serving': '#34D399',
  '13-mlops': '#A855F7',
  '14-agents': '#6366F1',
  '15-rag': '#818CF8',
  '16-prompt-engineering': '#C084FC',
  '17-observability': '#22D3EE',
  '18-multimodal': '#F59E0B',
  '19-emerging-techniques': '#F43F5E',
  '20-ml-paper-writing': '#34D399',
  '21-research-ideation': '#6366F1',
};

const CATEGORY_LABELS = {
  '0-autoresearch-skill': 'Autoresearch',
  '01-model-architecture': 'Model Architecture',
  '02-tokenization': 'Tokenization',
  '03-fine-tuning': 'Fine-Tuning',
  '04-mechanistic-interpretability': 'Mechanistic Interpretability',
  '05-data-processing': 'Data Processing',
  '06-post-training': 'Post-Training',
  '07-safety-alignment': 'Safety & Alignment',
  '08-distributed-training': 'Distributed Training',
  '09-infrastructure': 'Infrastructure',
  '10-optimization': 'Optimization',
  '11-evaluation': 'Evaluation',
  '12-inference-serving': 'Inference & Serving',
  '13-mlops': 'MLOps',
  '14-agents': 'Agents',
  '15-rag': 'RAG',
  '16-prompt-engineering': 'Prompt Engineering',
  '17-observability': 'Observability',
  '18-multimodal': 'Multimodal',
  '19-emerging-techniques': 'Emerging Techniques',
  '20-ml-paper-writing': 'ML Paper Writing',
  '21-research-ideation': 'Research Ideation',
};

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const raw = match[1];
  const data = {};

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      value = value.replace(/^['"]|['"]$/g, '');
    }

    data[key] = value;
  }

  return data;
}

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getCategoryDirs() {
  const entries = readdirSync(ROOT);
  return entries
    .filter((e) => {
      if (!CATEGORY_LABELS[e]) return false;
      return statSync(join(ROOT, e)).isDirectory();
    })
    .sort();
}

function getSkillDirs(categoryDir) {
  const entries = readdirSync(categoryDir);
  return entries.filter((e) => {
    const fullPath = join(categoryDir, e);
    return statSync(fullPath).isDirectory() && existsSync(join(fullPath, 'SKILL.md'));
  });
}

function readSkillContent(skillDir) {
  const skillMdPath = join(skillDir, 'SKILL.md');
  const content = readFileSync(skillMdPath, 'utf-8');
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter || !frontmatter.name) {
    console.warn(`  ⚠ Skipping ${skillDir}: missing or malformed frontmatter (no "name" field)`);
    return null;
  }

  const bodyMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)/);
  const body = bodyMatch ? bodyMatch[1].trim() : '';

  return { frontmatter, body };
}

const ACRONYMS = new Set(['llm','rl','rlhf','dpo','ppo','grpo','trl','moe','rag','fim','sae','clm','vlm','nlp','sam','blip','clip','peft','fsdp','vllm','sglang','awq','gptq','hqq','gguf','simd','mlops','sdpa','llava','lora','qlora','nemo','rwkv','cpm']);

function toTitleCase(dirName) {
  return dirName
    .split('-')
    .map(w => {
      const lower = w.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;');
}

function generateMdxContent(frontmatter, body, skillDirName, categorySlug) {
  const {
    name,
    description = '',
    version = '',
    author = '',
    license = '',
    tags = [],
    dependencies = [],
  } = frontmatter;

  const title = toTitleCase(skillDirName);
  const tagsArr = Array.isArray(tags) ? tags : [String(tags)];
  const depsArr = Array.isArray(dependencies) ? dependencies : [String(dependencies)].filter(Boolean);

  const tagsYaml = tagsArr.length > 0 ? `skillTags: [${tagsArr.map(t => `"${escapeQuotes(t)}"`).join(', ')}]` : '';
  const depsYaml = depsArr.length > 0 ? `skillDeps: [${depsArr.map(d => `"${escapeQuotes(d)}"`).join(', ')}]` : '';

  const lines = [
    '---',
    `title: "${escapeQuotes(title)}"`,
    `description: "${escapeQuotes(description)}"`,
    `skillName: "${escapeQuotes(name)}"`,
    `skillVersion: "${escapeQuotes(version)}"`,
    `skillAuthor: "${escapeQuotes(author)}"`,
    `skillLicense: "${escapeQuotes(license)}"`,
  ];

  if (tagsYaml) lines.push(tagsYaml);
  if (depsYaml) lines.push(depsYaml);

  lines.push('---', '');

  const catColor = CATEGORY_COLORS[categorySlug] || '#6366F1';
  lines.push(`<div class="skill-accent-bar" style="--cat-color:${catColor}"></div>`, '');

  const tagsBadges = tagsArr.map(t => `\`${t}\``).join(' ');
  const depsBadges = depsArr.map(d => `\`${d}\``).join(' ');

  lines.push(`| | |`);
  lines.push(`|---|---|`);
  lines.push(`| **Version** | ${version || '-'} |`);
  lines.push(`| **Author** | ${author || '-'} |`);
  lines.push(`| **License** | ${license || '-'} |`);
  if (tagsBadges) lines.push(`| **Tags** | ${tagsBadges} |`);
  if (depsBadges) lines.push(`| **Dependencies** | ${depsBadges} |`);
  lines.push('', '');

  lines.push(body, '');

  return lines.join('\n');
}

function generateCategoryIndex(categoryLabel, categorySlug, skills, catColor) {
  const base = '/AI-Research-SKILLs';
  const lines = [
    '---',
    `title: "${escapeQuotes(categoryLabel)}"`,
    `description: "Skills in the ${escapeQuotes(categoryLabel)} category"`,
    '---',
    '',
    `<div class="skill-accent-bar" style="--cat-color:${catColor}"></div>`,
    '',
    `<div class="skill-index-grid">`,
  ];

  for (const skill of skills) {
    let desc = skill.description ? skill.description.slice(0, 120) : '';
    desc = desc.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const tagsStr = (skill.tags || []).slice(0, 3).map(t => `\`${t}\``).join(' ');
    lines.push(`  <a class="skill-index-card" href="${base}/${categorySlug}/${skill.slug}" style="--card-accent:${catColor}">`);
    lines.push(`    <div class="skill-index-card-title">${skill.title}</div>`);
    if (desc) lines.push(`    <div class="skill-index-card-desc">${desc}</div>`);
    if (tagsStr) lines.push(`    <div class="skill-index-card-tags">${tagsStr}</div>`);
    lines.push(`  </a>`);
  }

  lines.push('</div>', '');
  return lines.join('\n');
}

function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function generateSidebarTs(sidebarData) {
  const entries = sidebarData.map((cat) => {
    const items = cat.items
      .map((item) => `    { label: "${item.label}", slug: "${item.slug}" }`)
      .join(',\n');
    return `  {\n    label: "${cat.label}",\n    items: [\n${items}\n    ]\n  }`;
  });

  const content = `// Auto-generated by scripts/generate-content.mjs — do not edit manually\n\nexport const sidebar = [\n${entries.join(',\n')}\n];\n`;

  return content;
}

function main() {
  console.log('Generating content from SKILL.md files...\n');
  console.log(`Root: ${ROOT}`);
  console.log(`Output: ${CONTENT_DIR}\n`);

  const categoryDirs = getCategoryDirs();
  const sidebarData = [];
  let totalSkills = 0;
  let skippedSkills = 0;

  for (const categoryEntry of categoryDirs) {
    const categoryDir = join(ROOT, categoryEntry);
    const categoryLabel = CATEGORY_LABELS[categoryEntry];
    const categorySlug = categoryEntry;
    const skillDirs = getSkillDirs(categoryDir);

    console.log(`📂 ${categoryLabel} (${categoryEntry}) — ${skillDirs.length} skill(s)`);

    if (skillDirs.length === 0) continue;

    const sidebarItems = [];
    const categorySkills = [];

    for (const skillEntry of skillDirs) {
      const skillDir = join(categoryDir, skillEntry);
      const result = readSkillContent(skillDir);

      if (!result) {
        skippedSkills++;
        continue;
      }

      const { frontmatter, body } = result;
      const skillSlug = toSlug(frontmatter.name);
      const outputDir = join(CONTENT_DIR, categorySlug);
      const outputPath = join(outputDir, `${skillSlug}.md`);

      ensureDir(outputDir);

      const mdxContent = generateMdxContent(frontmatter, body, skillEntry, categorySlug);
      writeFileSync(outputPath, mdxContent, 'utf-8');

      const displayLabel = toTitleCase(skillEntry);

      categorySkills.push({
        title: displayLabel,
        slug: skillSlug,
        description: frontmatter.description || '',
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      });

      sidebarItems.push({
        label: displayLabel,
        slug: `${categorySlug}/${skillSlug}`,
      });

      totalSkills++;
      console.log(`  ✅ ${frontmatter.name} → ${categorySlug}/${skillSlug}`);
    }

    if (categorySkills.length > 0) {
      const catColor = CATEGORY_COLORS[categorySlug] || '#6366F1';
      const indexPath = join(CONTENT_DIR, categorySlug, 'index.mdx');
      const indexContent = generateCategoryIndex(categoryLabel, categorySlug, categorySkills, catColor);
      writeFileSync(indexPath, indexContent, 'utf-8');
      console.log(`  📄 Category index → ${categorySlug}/index.mdx`);
    }

    if (sidebarItems.length > 0) {
      sidebarData.push({
        label: categoryLabel,
        items: sidebarItems,
      });
    }
  }

  ensureDir(dirname(SIDEBAR_PATH));
  const sidebarContent = generateSidebarTs(sidebarData);
  writeFileSync(SIDEBAR_PATH, sidebarContent, 'utf-8');
  console.log(`\n📝 Wrote sidebar.ts (${sidebarData.length} categories)`);

  console.log(`\n✨ Done! ${totalSkills} skill(s) generated, ${skippedSkills} skipped.`);
}

main();
