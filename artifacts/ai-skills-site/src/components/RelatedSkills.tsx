import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/skills";
import { useLanguage } from "@/contexts/LanguageContext";
import { categoryLabelsZh } from "@/i18n/categoryLabels";

interface RelatedSkillsProps {
  currentCategorySlug: string;
  currentSkillSlug: string;
  currentTags: readonly string[];
}

interface ScoredSkill {
  categorySlug: string;
  categoryLabel: string;
  categoryColor: string;
  slug: string;
  name: string;
  desc: string;
  tags: readonly string[];
  score: number;
  sameCategory: boolean;
}

function computeRelated(
  currentCategorySlug: string,
  currentSkillSlug: string,
  currentTags: readonly string[],
): ScoredSkill[] {
  const tagSet = new Set(currentTags.map((t) => t.toLowerCase()));
  const all: ScoredSkill[] = [];

  for (const cat of categories) {
    for (const sk of cat.skills) {
      if (cat.slug === currentCategorySlug && sk.slug === currentSkillSlug) continue;
      const overlap = sk.tags.reduce(
        (n, t) => (tagSet.has(t.toLowerCase()) ? n + 1 : n),
        0,
      );
      const sameCategory = cat.slug === currentCategorySlug;
      const score = (sameCategory ? 100 : 0) + overlap * 10;
      if (score > 0) {
        all.push({
          categorySlug: cat.slug,
          categoryLabel: cat.label,
          categoryColor: cat.color,
          slug: sk.slug,
          name: sk.name,
          desc: sk.desc,
          tags: sk.tags,
          score,
          sameCategory,
        });
      }
    }
  }

  all.sort((a, b) => b.score - a.score);
  return all.slice(0, 4);
}

export function RelatedSkills({
  currentCategorySlug,
  currentSkillSlug,
  currentTags,
}: RelatedSkillsProps) {
  const { t, lang } = useLanguage();
  const related = computeRelated(currentCategorySlug, currentSkillSlug, currentTags);

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        <h2 className="text-2xl font-bold tracking-tight">{t("relatedSkills")}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {related.map((r) => {
          const catLabel =
            lang === "zh" ? (categoryLabelsZh[r.categorySlug] ?? r.categoryLabel) : r.categoryLabel;
          return (
            <Link
              key={`${r.categorySlug}/${r.slug}`}
              href={`/skill/${r.categorySlug}/${r.slug}`}
              data-testid={`link-related-${r.slug}`}
              className="group block p-5 rounded-xl border border-border bg-card hover:border-foreground/30 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <div
                    className="text-xs font-mono uppercase tracking-wider mb-1.5"
                    style={{ color: r.categoryColor }}
                  >
                    {catLabel}
                  </div>
                  <h3 className="font-bold text-lg leading-tight">{r.name}</h3>
                </div>
                <ArrowUpRight
                  size={18}
                  className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors mt-1"
                />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{r.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
