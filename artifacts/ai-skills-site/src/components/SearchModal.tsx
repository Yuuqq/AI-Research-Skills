import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { categories } from "@/data/skills";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { categoryLabelsZh } from "@/i18n/categoryLabels";
import { skillKeywords } from "@/i18n/skillKeywords";
import { Search, Sparkles, ArrowRight, Clock, Star } from "lucide-react";

// Resolve a "categorySlug/skillSlug" key to its category + skill objects.
function resolveKey(key: string) {
  const [catSlug, skillSlug] = key.split("/");
  const cat = categories.find((c) => c.slug === catSlug);
  const sk = cat?.skills.find((s) => s.slug === skillSlug);
  if (!cat || !sk) return null;
  return { cat, sk };
}

// Hand-picked beginner-friendly suggestions shown when the search input is empty.
const SUGGESTED_KEYS: { category: string; slug: string }[] = [
  { category: "12-inference-serving", slug: "ollama" },
  { category: "12-inference-serving", slug: "serving-llms-vllm" },
  { category: "18-multimodal", slug: "whisper" },
  { category: "14-agents", slug: "langchain" },
  { category: "15-rag", slug: "chroma" },
  { category: "06-post-training", slug: "grpo-rl-training" },
];

export function SearchModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [, setLocation] = useLocation();
  const { lang, t } = useLanguage();
  const { recent, favorites } = useUserPrefs();
  const [query, setQuery] = useState("");

  // Reset query when modal closes so reopening shows suggestions again
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  // Resolve suggested skills against actual data (skip any that don't exist)
  const suggested = SUGGESTED_KEYS.flatMap(({ category: catSlug, slug }) => {
    const cat = categories.find((c) => c.slug === catSlug);
    const sk = cat?.skills.find((s) => s.slug === slug);
    if (!cat || !sk) return [];
    const catLabel = lang === "zh" ? (categoryLabelsZh[cat.slug] ?? cat.label) : cat.label;
    return [{ cat, sk, catLabel }];
  });

  const showSuggestions = query.trim().length === 0;

  const labelFor = (catSlug: string, fallback: string) =>
    lang === "zh" ? (categoryLabelsZh[catSlug] ?? fallback) : fallback;

  const recentItems = showSuggestions
    ? recent.flatMap((key) => {
        const r = resolveKey(key);
        return r ? [{ key, ...r, catLabel: labelFor(r.cat.slug, r.cat.label) }] : [];
      }).slice(0, 5)
    : [];

  const favoriteItems = showSuggestions
    ? favorites.flatMap((key) => {
        const r = resolveKey(key);
        return r ? [{ key, ...r, catLabel: labelFor(r.cat.slug, r.cat.label) }] : [];
      })
    : [];

  // Hide hand-picked suggestions once the user has their own recents/favorites
  const showHandPicked = showSuggestions && recentItems.length === 0 && favoriteItems.length === 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden bg-card border-border shadow-2xl sm:max-w-[600px]">
        <Command className="bg-transparent" loop>
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder={t("searchModalPlaceholder")}
              value={query}
              onValueChange={setQuery}
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
              data-testid="input-search-modal"
            />
          </div>
          <CommandList className="max-h-[60vh] overflow-y-auto p-2">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              {t("searchNoResults")}
            </CommandEmpty>

            {recentItems.length > 0 && (
              <CommandGroup
                heading={
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} className="text-muted-foreground" />
                    {t("searchRecent")}
                  </span>
                }
                className="text-muted-foreground"
              >
                {recentItems.map(({ key, cat, sk, catLabel }) => (
                  <CommandItem
                    key={`recent-${key}`}
                    value={`__recent_${key}`}
                    onSelect={() => runCommand(() => setLocation(`/skill/${cat.slug}/${sk.slug}`))}
                    className="flex items-center gap-3 py-2.5 px-3 cursor-pointer aria-selected:bg-muted/50 rounded-md"
                    data-testid={`item-recent-${sk.slug}`}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="font-medium text-foreground flex-1">{sk.name}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full border bg-background"
                      style={{ color: cat.color, borderColor: `${cat.color}40` }}
                    >
                      {catLabel}
                    </span>
                    <ArrowRight size={12} className="text-muted-foreground" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {favoriteItems.length > 0 && (
              <CommandGroup
                heading={
                  <span className="flex items-center gap-1.5">
                    <Star size={11} className="text-amber-400" fill="currentColor" />
                    {t("searchFavorites")}
                  </span>
                }
                className="text-muted-foreground"
              >
                {favoriteItems.map(({ key, cat, sk, catLabel }) => (
                  <CommandItem
                    key={`fav-${key}`}
                    value={`__fav_${key}`}
                    onSelect={() => runCommand(() => setLocation(`/skill/${cat.slug}/${sk.slug}`))}
                    className="flex items-center gap-3 py-2.5 px-3 cursor-pointer aria-selected:bg-muted/50 rounded-md"
                    data-testid={`item-fav-${sk.slug}`}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="font-medium text-foreground flex-1">{sk.name}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full border bg-background"
                      style={{ color: cat.color, borderColor: `${cat.color}40` }}
                    >
                      {catLabel}
                    </span>
                    <ArrowRight size={12} className="text-muted-foreground" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {showHandPicked && suggested.length > 0 && (
              <CommandGroup
                heading={
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={11} className="text-primary" />
                    {t("searchSuggested")}
                  </span>
                }
                className="text-muted-foreground"
              >
                {suggested.map(({ cat, sk, catLabel }) => (
                  <CommandItem
                    key={`sug-${cat.slug}-${sk.slug}`}
                    value={`__suggested_${sk.name}`}
                    onSelect={() => runCommand(() => setLocation(`/skill/${cat.slug}/${sk.slug}`))}
                    className="flex items-center gap-3 py-2.5 px-3 cursor-pointer aria-selected:bg-muted/50 rounded-md"
                    data-testid={`item-suggested-${sk.slug}`}
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-medium text-foreground flex-1">{sk.name}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full border bg-background"
                      style={{ color: cat.color, borderColor: `${cat.color}40` }}
                    >
                      {catLabel}
                    </span>
                    <ArrowRight size={12} className="text-muted-foreground" />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {categories.map((category) => {
              const catLabel = lang === "zh"
                ? (categoryLabelsZh[category.slug] ?? category.label)
                : category.label;

              return (
                <CommandGroup key={category.slug} heading={catLabel} className="text-muted-foreground">
                  {category.skills.map((skill) => {
                    const zhCat = categoryLabelsZh[category.slug] ?? "";
                    const kw = skillKeywords[`${category.slug}/${skill.slug}`] ?? [];
                    const searchValue = [
                      skill.name,
                      skill.desc,
                      skill.tags.join(" "),
                      category.label,
                      zhCat,
                      kw.join(" "),
                    ].join(" ");
                    return (
                    <CommandItem
                      key={`${category.slug}-${skill.slug}`}
                      value={searchValue}
                      onSelect={() => runCommand(() => setLocation(`/skill/${category.slug}/${skill.slug}`))}
                      className="flex flex-col items-start gap-1 py-3 px-4 cursor-pointer aria-selected:bg-muted/50 rounded-md"
                      data-testid={`item-skill-${skill.slug}`}
                    >
                      <div className="flex items-center w-full justify-between">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full border bg-background"
                          style={{ color: category.color, borderColor: `${category.color}40` }}
                        >
                          {catLabel}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground line-clamp-1">{skill.desc}</span>
                    </CommandItem>
                    );
                  })}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
