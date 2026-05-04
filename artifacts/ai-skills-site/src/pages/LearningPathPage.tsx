import { useRoute, Link } from "wouter";
import { ArrowLeft, ArrowRight, Map, Github } from "lucide-react";
import { motion } from "framer-motion";
import { learningPaths } from "@/data/learningPaths";
import { categories } from "@/data/skills";
import { useLanguage } from "@/contexts/LanguageContext";
import { categoryLabelsZh } from "@/i18n/categoryLabels";
import { GlowOrb } from "@/components/GlowOrb";
import { Footer } from "@/components/Footer";
import NotFound from "./not-found";

export default function LearningPathPage() {
  const [, params] = useRoute("/path/:id");
  const id = params?.id;
  const { t, lang } = useLanguage();

  const path = learningPaths.find((p) => p.id === id);
  if (!path) return <NotFound />;

  const steps = path.skills.flatMap((key) => {
    const [catSlug, skSlug] = key.split("/");
    const cat = categories.find((c) => c.slug === catSlug);
    const sk = cat?.skills.find((s) => s.slug === skSlug);
    if (!cat || !sk) return [];
    return [{ cat, sk }];
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="h-1 w-full" style={{ backgroundColor: path.color }} />
      <GlowOrb color={path.color} size={600} top="-200px" right="-100px" delay={0} />

      <div className="flex-1 max-w-5xl w-full mx-auto px-6 pt-20 pb-12 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-12 font-mono overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft size={14} />
            {t("home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{t("pathsLabel")}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{path.name[lang]}</span>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-6 border"
            style={{ color: path.color, borderColor: `${path.color}50`, backgroundColor: `${path.color}10` }}
          >
            <Map size={13} />
            {t("learningPath")}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{path.name[lang]}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-6">
            {path.desc[lang]}
          </p>
          <div className="text-sm font-mono text-muted-foreground">
            <span style={{ color: path.color }}>{steps.length}</span> {t("stepsCount")}
          </div>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* connecting line */}
          <div
            className="absolute left-5 top-2 bottom-2 w-0.5 hidden sm:block opacity-30"
            style={{ backgroundColor: path.color }}
          />

          <ol className="space-y-4 relative">
            {steps.map(({ cat, sk }, i) => {
              const catLabel =
                lang === "zh" ? (categoryLabelsZh[cat.slug] ?? cat.label) : cat.label;
              return (
              <motion.li
                key={`${cat.slug}/${sk.slug}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={`/skill/${cat.slug}/${sk.slug}`}
                  data-testid={`link-path-step-${i + 1}`}
                  className="group flex gap-5 items-start p-5 rounded-xl border border-border bg-card hover:border-foreground/30 hover:-translate-y-0.5 transition-all relative"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm text-white relative z-10"
                    style={{ backgroundColor: path.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-xs font-mono uppercase tracking-wider mb-1"
                      style={{ color: cat.color }}
                    >
                      {catLabel}
                    </div>
                    <h3 className="font-bold text-lg mb-1.5">{sk.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {sk.desc}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="flex-shrink-0 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all mt-3"
                  />
                </Link>
              </motion.li>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <a
            href="https://github.com/Yuuqq/AI-Research-Skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
            style={{ backgroundColor: path.color }}
          >
            <Github size={18} />
            {t("viewSourceLib")}
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
