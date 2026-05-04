import { useActiveSection } from "@/hooks/useActiveSection";
import { useLanguage } from "@/contexts/LanguageContext";

interface TocItem {
  id: string;
  label: string;
}

interface Props {
  items: TocItem[];
  color: string;
}

/**
 * Floating right-side table of contents, desktop only (xl breakpoint).
 * Hidden on smaller screens where the page already fits comfortably.
 */
export function SkillPageTOC({ items, color }: Props) {
  const { t } = useLanguage();
  const active = useActiveSection(
    items.map((i) => i.id),
    120,
  );

  if (items.length === 0) return null;

  return (
    <nav
      aria-label={t("tocOnThisPage")}
      className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 z-20 max-w-[200px]"
    >
      <ul className="space-y-1 border-l border-border pl-4">
        {items.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(id);
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className={`block py-1 text-xs transition-colors leading-relaxed ${
                  isActive
                    ? "font-semibold"
                    : "text-muted-foreground/70 hover:text-foreground"
                }`}
                style={isActive ? { color } : undefined}
                data-testid={`toc-link-${id}`}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
