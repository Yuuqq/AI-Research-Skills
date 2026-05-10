import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Github, Terminal, Info, BookOpen, Sparkles, Cog, ListOrdered, Download } from "lucide-react";
import { categories } from "@/data/skills";
import { skillOutlines, type SkillOutline } from "@/data/skillOutlines";
import { motion } from "framer-motion";
import NotFound from "./not-found";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { categoryLabelsZh } from "@/i18n/categoryLabels";
import { CopyableCommand } from "@/components/CopyableCommand";
import { FavoriteButton } from "@/components/FavoriteButton";
import { SkillNavigation } from "@/components/SkillNavigation";
import { RelatedSkills } from "@/components/RelatedSkills";
import { Footer } from "@/components/Footer";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { SkillPageTOC } from "@/components/SkillPageTOC";

export default function SkillPage() {
  const [, params] = useRoute("/skill/:category/:slug");
  const categorySlug = params?.category;
  const skillSlug = params?.slug;
  const { lang, t } = useLanguage();
  const { addRecent } = useUserPrefs();

  const category = categories.find((c) => c.slug === categorySlug);
  const skillIndex = category?.skills.findIndex((s) => s.slug === skillSlug) ?? -1;
  const skill = skillIndex >= 0 ? category?.skills[skillIndex] : undefined;

  // Track recently-viewed skill keys for the search modal
  useEffect(() => {
    if (category && skill) addRecent(`${category.slug}/${skill.slug}`);
  }, [category?.slug, skill?.slug, addRecent]);

  if (!category || !skill) {
    return <NotFound />;
  }

  const prevSkill = skillIndex > 0 ? category.skills[skillIndex - 1] : null;
  const nextSkill =
    skillIndex >= 0 && skillIndex < category.skills.length - 1
      ? category.skills[skillIndex + 1]
      : null;
  const installCommand = `git clone https://github.com/Orchestra-Research/AI-research-SKILLs.git\ncd AI-research-SKILLs/${category.slug}/${skill.slug}`;

  const categoryLabel =
    lang === "zh" ? (categoryLabelsZh[category.slug] ?? category.label) : category.label;

  const outlineKey = `${category.slug}/${skill.slug}` as keyof typeof skillOutlines;
  const outline: SkillOutline | undefined = (
    skillOutlines as Record<string, SkillOutline>
  )[outlineKey];

  const githubUrl = `https://github.com/Orchestra-Research/AI-research-SKILLs/tree/main/${category.slug}/${skill.slug}`;

  const tocItems = [
    ...(outline ? [{ id: "overview", label: t("tocOverview") }] : []),
    { id: "install", label: t("tocInstall") },
    { id: "dependencies", label: t("tocDependencies") },
    { id: "related", label: t("tocRelated") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ReadingProgressBar color={category.color} />

      {/* Left Colored Accent Border */}
      <div className="w-1.5 min-h-screen fixed left-0 top-0 z-10" style={{ backgroundColor: category.color }} />

      <SkillPageTOC items={tocItems} color={category.color} />

      <div className="w-full pl-1.5 flex-1">
        <div className="max-w-4xl mx-auto px-6 md:px-12 pt-20 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-12 font-mono overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ArrowLeft size={14} />
              {t("home")}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${category.slug}`} className="hover:text-foreground transition-colors">
              {categoryLabel}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{skill.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight flex-1">{skill.name}</h1>
                <FavoriteButton skillKey={`${category.slug}/${skill.slug}`} size="md" className="mt-2 shrink-0" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm rounded-md border font-medium bg-card"
                    style={{ color: category.color, borderColor: `${category.color}40` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="relative pl-6 py-2 mb-12">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: category.color }} />
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">{skill.desc}</p>
            </div>

            {/* OUTLINE */}
            {outline && (
              <div id="overview" className="mb-12 scroll-mt-24">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category.color }} />
                  <h2 className="text-2xl font-bold tracking-tight">{t("outline")}</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* What it does */}
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center">
                      <Sparkles size={18} className="mr-2" style={{ color: category.color }} />
                      <h3 className="font-bold text-sm uppercase tracking-wider">{t("whatItDoes")}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-base md:text-lg leading-relaxed text-foreground">
                        {outline.what[lang]}
                      </p>
                    </div>
                  </div>

                  {/* How it works */}
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center">
                      <Cog size={18} className="mr-2" style={{ color: category.color }} />
                      <h3 className="font-bold text-sm uppercase tracking-wider">{t("howItWorks")}</h3>
                    </div>
                    <ul className="p-6 space-y-3">
                      {outline.how[lang].map((item, i) => (
                        <li key={i} className="flex gap-3 text-base text-muted-foreground leading-relaxed">
                          <span
                            className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Typical workflow */}
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center">
                      <ListOrdered size={18} className="mr-2" style={{ color: category.color }} />
                      <h3 className="font-bold text-sm uppercase tracking-wider">{t("typicalWorkflow")}</h3>
                    </div>
                    <ol className="p-6 space-y-3">
                      {outline.workflow[lang].map((step, i) => (
                        <li key={i} className="flex gap-4 text-base text-muted-foreground leading-relaxed">
                          <span
                            className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold font-mono mt-0.5 text-white"
                            style={{ backgroundColor: category.color }}
                          >
                            {i + 1}
                          </span>
                          <span className="flex-1 break-words font-mono text-sm md:text-[0.95rem]">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Install */}
            <div id="install" className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <Download size={18} style={{ color: category.color }} />
                <h2 className="text-lg font-bold tracking-tight uppercase font-mono">
                  {t("quickInstall")}
                </h2>
              </div>
              <CopyableCommand command={installCommand} color={category.color} />
            </div>

            <div id="dependencies" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 scroll-mt-24">
              {/* Dependencies */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center">
                  <Terminal size={18} className="mr-2 text-muted-foreground" />
                  <h3 className="font-bold">{t("dependencies")}</h3>
                </div>
                <div className="p-6">
                  {skill.deps.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skill.deps.map((dep) => (
                        <span
                          key={dep}
                          className="px-2.5 py-1 text-sm rounded border border-border bg-muted/50 text-foreground font-mono"
                        >
                          {dep}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm italic">{t("noDeps")}</span>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center">
                  <Info size={18} className="mr-2 text-muted-foreground" />
                  <h3 className="font-bold">{t("metadata")}</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border/50">
                    <span className="text-muted-foreground text-sm">{t("version")}</span>
                    <span className="font-mono text-sm">{t("latest")}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border/50">
                    <span className="text-muted-foreground text-sm">{t("author")}</span>
                    <span className="font-medium text-sm">{t("community")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">{t("license")}</span>
                    <span className="font-mono text-sm">MIT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github"
                className="flex items-center justify-center px-6 py-4 rounded-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ backgroundColor: category.color }}
              >
                <Github size={20} className="mr-2" />
                {t("viewGithub")}
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                title={t("docsComingSoon")}
                className="flex items-center justify-center px-6 py-4 rounded-lg border border-border bg-card font-bold text-foreground transition-all hover:bg-muted/50 cursor-not-allowed opacity-50"
              >
                <BookOpen size={20} className="mr-2" />
                {t("readDocs")}
              </a>
            </div>

            {/* Prev / Next Navigation */}
            <SkillNavigation
              categorySlug={category.slug}
              prev={prevSkill ? { slug: prevSkill.slug, name: prevSkill.name } : null}
              next={nextSkill ? { slug: nextSkill.slug, name: nextSkill.name } : null}
              color={category.color}
            />

            {/* Related Skills */}
            <div id="related" className="scroll-mt-24" />
            <RelatedSkills
              currentCategorySlug={category.slug}
              currentSkillSlug={skill.slug}
              currentTags={skill.tags}
            />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
