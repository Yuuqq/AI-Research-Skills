import { Link } from "wouter";
import { motion } from "framer-motion";
import { Rocket, Timer, Terminal, ArrowRight } from "lucide-react";
import { categories } from "@/data/skills";
import { quickStartItems } from "@/data/quickStart";
import { useLanguage } from "@/contexts/LanguageContext";

export function QuickStartSkills() {
  const { t, lang } = useLanguage();

  const items = quickStartItems.flatMap((item) => {
    const [catSlug, skSlug] = item.key.split("/");
    const cat = categories.find((c) => c.slug === catSlug);
    const sk = cat?.skills.find((s) => s.slug === skSlug);
    if (!cat || !sk) return [];
    return [{ cat, sk, time: item.time, hook: item.hook, command: item.command }];
  });

  return (
    <section className="py-20 px-6 relative z-10 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              <Rocket size={14} />
              {t("quickStartLabel")}
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t("quickStartTitle")}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{t("quickStartSubtitle")}</p>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          {items.map(({ cat, sk, time, hook, command }) => (
            <motion.div
              key={`${cat.slug}/${sk.slug}`}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/skill/${cat.slug}/${sk.slug}`}
                data-testid={`link-quickstart-${sk.slug}`}
                className="group flex flex-col h-full p-5 rounded-2xl border border-border bg-card hover:border-foreground/30 hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                <div
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ backgroundColor: cat.color }}
                />

                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="min-w-0">
                    <div
                      className="text-[11px] font-mono uppercase tracking-wider mb-1"
                      style={{ color: cat.color }}
                    >
                      {cat.label}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">{sk.name}</h3>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-medium border border-emerald-400/40 text-emerald-400 bg-emerald-400/10">
                    <Timer size={11} />
                    {time[lang]}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {hook[lang]}
                </p>

                <div className="rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-foreground overflow-x-auto whitespace-nowrap mb-3">
                  <span className="text-muted-foreground mr-1.5">
                    <Terminal size={11} className="inline -mt-0.5" /> $
                  </span>
                  {command}
                </div>

                <div
                  className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all"
                  style={{ color: cat.color }}
                >
                  {t("quickStartCta")} <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
