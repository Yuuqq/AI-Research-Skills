import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { categories } from "@/data/skills";
import { featuredPicks } from "@/data/featuredPicks";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturedSkills() {
  const { t, lang } = useLanguage();

  const items = featuredPicks.flatMap((pick) => {
    const [catSlug, skSlug] = pick.key.split("/");
    const cat = categories.find((c) => c.slug === catSlug);
    const sk = cat?.skills.find((s) => s.slug === skSlug);
    if (!cat || !sk) return [];
    return [{ cat, sk, badge: pick.badge, plain: pick.plain }];
  });

  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary mb-2">
              <Sparkles size={14} />
              {t("featuredLabel")}
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t("featuredTitle")}</h2>
          </div>
          <div className="h-[1px] flex-grow bg-border ml-8 hidden md:block" />
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
        >
          {items.map(({ cat, sk, badge, plain }) => (
            <motion.div
              key={`${cat.slug}/${sk.slug}`}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/skill/${cat.slug}/${sk.slug}`}
                data-testid={`link-featured-${sk.slug}`}
                className="group block h-full p-6 rounded-2xl border border-border bg-card hover:border-foreground/30 hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                <div
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium uppercase tracking-wider border"
                    style={{ color: cat.color, borderColor: `${cat.color}40` }}
                  >
                    {badge[lang]}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">{sk.name}</h3>
                <p className="text-base text-foreground leading-relaxed mb-3">
                  {plain[lang]}
                </p>
                <p className="text-xs text-muted-foreground/70 leading-relaxed line-clamp-2 font-mono">
                  {sk.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
