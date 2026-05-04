import { useState, useMemo, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/data/skills";
import { SkillCard } from "@/components/SkillCard";
import { TagFilter } from "@/components/TagFilter";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import NotFound from "./not-found";
import { GlowOrb } from "@/components/GlowOrb";
import { useLanguage } from "@/contexts/LanguageContext";
import { categoryLabelsZh, categoryDescsZh } from "@/i18n/categoryLabels";

export default function CategoryPage() {
  const [, params] = useRoute("/category/:slug");
  const slug = params?.slug;
  const { lang, t } = useLanguage();

  const category = categories.find((c) => c.slug === slug);

  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSelectedTags(new Set());
  }, [slug]);

  const allTags = useMemo(() => {
    if (!category) return [];
    const counts = new Map<string, number>();
    for (const sk of category.skills) {
      for (const tag of sk.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t);
  }, [category]);

  const filteredSkills = useMemo(() => {
    if (!category) return [];
    if (selectedTags.size === 0) return [...category.skills];
    return category.skills.filter((sk) => sk.tags.some((t) => selectedTags.has(t)));
  }, [category, selectedTags]);

  if (!category) {
    return <NotFound />;
  }

  const label = lang === "zh" ? (categoryLabelsZh[category.slug] ?? category.label) : category.label;
  const desc = lang === "zh" ? (categoryDescsZh[category.slug] ?? category.desc) : category.desc;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="h-1 w-full" style={{ backgroundColor: category.color }} />

      <GlowOrb color={category.color} size={500} top="-200px" right="-100px" delay={0} />

      <div className="flex-1 max-w-7xl w-full mx-auto px-6 pt-20 pb-12 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-12 font-mono overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center">
            <ArrowLeft size={14} className="mr-1" />
            {t("home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{label}</span>
        </div>

        {/* Category Hero */}
        <div className="mb-12">
          <div
            className="inline-flex px-3 py-1 rounded-full border bg-background/50 font-mono text-xs font-medium mb-6"
            style={{ color: category.color, borderColor: `${category.color}40` }}
          >
            {category.skills.length} {t("skillsCount").toUpperCase()}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{label}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{desc}</p>
        </div>

        {/* Tag Filter */}
        <TagFilter
          tags={allTags}
          selected={selectedTags}
          onToggle={toggleTag}
          onClear={() => setSelectedTags(new Set())}
          color={category.color}
        />

        {/* Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SkillCard skill={skill} categorySlug={category.slug} color={category.color} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground font-mono text-sm">
            {t("noSkillsMatching")}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
