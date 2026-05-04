import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavSkill {
  slug: string;
  name: string;
}

interface SkillNavigationProps {
  categorySlug: string;
  prev: NavSkill | null;
  next: NavSkill | null;
  color: string;
}

export function SkillNavigation({ categorySlug, prev, next, color }: SkillNavigationProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
      {prev ? (
        <Link
          href={`/skill/${categorySlug}/${prev.slug}`}
          data-testid="link-prev-skill"
          className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:bg-muted/30 hover:border-foreground/30 transition-all"
        >
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-border bg-background group-hover:-translate-x-1 transition-transform"
            style={{ color }}
          >
            <ArrowLeft size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
              {t("prevSkill")}
            </div>
            <div className="font-bold text-base truncate">{prev.name}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/skill/${categorySlug}/${next.slug}`}
          data-testid="link-next-skill"
          className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:bg-muted/30 hover:border-foreground/30 transition-all md:text-right md:flex-row-reverse"
        >
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-border bg-background group-hover:translate-x-1 transition-transform"
            style={{ color }}
          >
            <ArrowRight size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
              {t("nextSkill")}
            </div>
            <div className="font-bold text-base truncate">{next.name}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
