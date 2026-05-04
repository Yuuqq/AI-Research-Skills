import { motion } from "framer-motion";
import { GlowOrb } from "@/components/GlowOrb";
import { StatCounter } from "@/components/StatCounter";
import { CategoryCard } from "@/components/CategoryCard";
import { Marquee } from "@/components/Marquee";
import { FeaturedSkills } from "@/components/FeaturedSkills";
import { QuickStartSkills } from "@/components/QuickStartSkills";
import { UseCaseFinder } from "@/components/UseCaseFinder";
import { LearningPaths } from "@/components/LearningPaths";
import { Footer } from "@/components/Footer";
import { categories, totalSkills, totalCategories } from "@/data/skills";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";
import { Search, Compass, Rocket, LayoutGrid } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const { open: openSearch } = useSearch();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 px-6">
        <GlowOrb color="#6366F1" size={400} top="-100px" left="-100px" delay={0} />
        <GlowOrb color="#A855F7" size={300} top="20%" right="-50px" delay={2} />
        <GlowOrb color="#22D3EE" size={350} bottom="-150px" left="30%" delay={4} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-mono mb-8 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
              {t("badge")}
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="gradient-text">{t("heroTitle")}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              {t("heroSubtitle")}
            </p>

            <button
              onClick={openSearch}
              data-testid="button-search-open"
              className="mx-auto flex items-center justify-between w-full max-w-md bg-card/80 backdrop-blur-md border border-border hover:border-primary/50 text-muted-foreground rounded-lg px-4 py-3 transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] group"
            >
              <div className="flex items-center">
                <Search className="w-5 h-5 mr-3 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>{t("searchPlaceholder")}</span>
              </div>
              <div className="hidden md:flex items-center gap-1">
                <kbd className="inline-flex h-6 items-center rounded border bg-background px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </button>

            {/* Quick jump pills — give scent of what's below */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              <a
                href="#goals"
                data-testid="link-jump-goals"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-sm text-muted-foreground hover:text-foreground hover:border-cyan-400/40 transition-colors"
              >
                <Compass size={13} className="text-cyan-400" />
                {t("heroJumpGoals")}
              </a>
              <a
                href="#quick-start"
                data-testid="link-jump-quick"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-sm text-muted-foreground hover:text-foreground hover:border-emerald-400/40 transition-colors"
              >
                <Rocket size={13} className="text-emerald-400" />
                {t("heroJumpQuick")}
              </a>
              <a
                href="#library"
                data-testid="link-jump-library"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <LayoutGrid size={13} className="text-primary" />
                {t("heroJumpLibrary")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-card/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter end={totalSkills} label={t("statsSkills")} suffix="+" />
            <StatCounter end={totalCategories} label={t("statsCategories")} />
            <StatCounter end={1} label={t("statsOrchestrator")} />
            <StatCounter end={Infinity} label={t("statsExperiments")} />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Use Case Finder — "I want to..." goal-based picker, most beginner-friendly */}
      <div id="goals" />
      <UseCaseFinder />

      {/* Quick Start — beginner-friendly skills you can try in minutes */}
      <div id="quick-start" />
      <QuickStartSkills />

      {/* Featured Picks */}
      <FeaturedSkills />

      {/* Bento Grid */}
      <section id="library" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">{t("sectionTitle")}</h2>
            <div className="h-[1px] flex-grow bg-border ml-8 hidden md:block" />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
          >
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <div id="paths" />
      <LearningPaths />

      <Footer />
    </div>
  );
}
