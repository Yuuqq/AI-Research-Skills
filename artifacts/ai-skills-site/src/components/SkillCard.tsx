import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FavoriteButton } from "@/components/FavoriteButton";
import { SkillVotes } from "@/components/SkillVotes";

interface SkillCardProps {
  skill: {
    slug: string;
    name: string;
    desc: string;
    tags: readonly string[];
    deps: readonly string[];
  };
  categorySlug: string;
  color: string;
}

export function SkillCard({ skill, categorySlug, color }: SkillCardProps) {
  const { t } = useLanguage();

  return (
    <div
      className="flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden hover:border-muted-foreground/30 transition-colors"
      data-testid={`card-skill-${skill.slug}`}
    >
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-white flex-1">{skill.name}</h3>
          <div className="flex items-center gap-1 -mt-1 -mr-1">
            <SkillVotes slug={skill.slug} />
            <FavoriteButton skillKey={`${categorySlug}/${skill.slug}`} />
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{skill.desc}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-md border bg-background/50 font-medium"
              style={{ color: color, borderColor: `${color}30` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground font-mono flex items-center">{t("deps")}</span>
          {skill.deps.map((dep) => (
            <span key={dep} className="px-1.5 py-0.5 text-xs rounded bg-muted/50 text-muted-foreground font-mono">
              {dep}
            </span>
          ))}
        </div>
      </div>

      <Link href={`/skill/${categorySlug}/${skill.slug}`} className="group">
        <div className="bg-muted/20 px-6 py-3 flex items-center justify-between text-sm font-medium text-foreground group-hover:bg-muted/40 transition-colors border-t border-border">
          <span>{t("viewSkill")}</span>
          <ArrowRight size={16} className="text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </div>
  );
}
