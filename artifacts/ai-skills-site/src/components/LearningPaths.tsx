import { Link } from "wouter";
import { motion } from "framer-motion";
import { Map, ArrowRight } from "lucide-react";
import { learningPaths } from "@/data/learningPaths";
import { useLanguage } from "@/contexts/LanguageContext";

export function LearningPaths() {
  const { t, lang } = useLanguage();

  return (
    <section className="py-20 px-6 relative z-10 border-t border-border/50 bg-card/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary mb-2">
              <Map size={14} />
              {t("pathsLabel")}
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t("pathsTitle")}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{t("pathsSubtitle")}</p>
          </div>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
          }}
        >
          {learningPaths.map((path) => (
            <motion.div
              key={path.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/path/${path.id}`}
                data-testid={`link-path-${path.id}`}
                className="group block h-full p-6 rounded-2xl border border-border bg-card hover:border-foreground/30 hover:-translate-y-1 transition-all relative overflow-hidden"
              >
                <div
                  className="absolute -inset-x-12 -top-24 h-48 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: path.color }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg"
                      style={{ backgroundColor: `${path.color}20`, color: path.color }}
                    >
                      <Map size={18} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      {path.skills.length} {t("stepsCount")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{path.name[lang]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {path.desc[lang]}
                  </p>
                  <div
                    className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all"
                    style={{ color: path.color }}
                  >
                    {t("startPath")} <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
