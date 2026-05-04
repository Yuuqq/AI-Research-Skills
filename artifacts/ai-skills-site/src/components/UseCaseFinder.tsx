import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";
import { categories } from "@/data/skills";
import { useCases } from "@/data/useCases";
import { useLanguage } from "@/contexts/LanguageContext";

export function UseCaseFinder() {
  const { t, lang } = useLanguage();
  const [activeId, setActiveId] = useState<string>(useCases[0]?.id ?? "");

  const active = useCases.find((u) => u.id === activeId);

  const resolvedPicks = active
    ? active.picks.flatMap((pick) => {
        const [catSlug, skSlug] = pick.key.split("/");
        const cat = categories.find((c) => c.slug === catSlug);
        const sk = cat?.skills.find((s) => s.slug === skSlug);
        if (!cat || !sk) return [];
        return [{ cat, sk, reason: pick.reason }];
      })
    : [];

  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            <Compass size={14} />
            {t("useCaseLabel")}
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{t("useCaseTitle")}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">{t("useCaseSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-6">
          {/* Goal selector */}
          <div className="flex flex-col gap-2">
            {useCases.map((uc) => {
              const isActive = uc.id === activeId;
              return (
                <button
                  key={uc.id}
                  type="button"
                  onClick={() => setActiveId(uc.id)}
                  data-testid={`button-usecase-${uc.id}`}
                  className={`group flex items-center gap-3 text-left p-4 rounded-xl border transition-all ${
                    isActive
                      ? "border-cyan-400/50 bg-cyan-400/5 shadow-[0_0_24px_rgba(34,211,238,0.08)]"
                      : "border-border bg-card hover:border-foreground/30"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="text-2xl flex-shrink-0">{uc.emoji}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-base text-foreground leading-snug">
                      {uc.goal[lang]}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    className={`flex-shrink-0 transition-all ${
                      isActive ? "text-cyan-400 translate-x-0.5" : "text-muted-foreground/40 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active goal detail */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 min-h-[20rem]">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-4xl flex-shrink-0">{active.emoji}</span>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-bold tracking-tight mb-2">
                        {active.goal[lang]}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {active.detail[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    {t("useCaseUseThese")}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {resolvedPicks.map(({ cat, sk, reason }, i) => (
                      <Link
                        key={`${cat.slug}/${sk.slug}`}
                        href={`/skill/${cat.slug}/${sk.slug}`}
                        data-testid={`link-usecase-pick-${sk.slug}`}
                        className="group flex items-start gap-3 p-4 rounded-lg border border-border bg-background hover:border-foreground/30 hover:-translate-y-0.5 transition-all"
                      >
                        <span
                          className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-xs font-mono font-bold text-white"
                          style={{ backgroundColor: cat.color }}
                        >
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-foreground">{sk.name}</span>
                            <ArrowRight
                              size={13}
                              className="text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                            />
                          </div>
                          <div className="text-sm text-muted-foreground leading-snug">
                            {reason[lang]}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
