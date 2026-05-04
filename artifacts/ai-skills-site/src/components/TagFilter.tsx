import { Filter, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TagFilterProps {
  tags: string[];
  selected: Set<string>;
  onToggle: (tag: string) => void;
  onClear: () => void;
  color: string;
}

function getReadableOnColor(hex: string): string {
  const m = hex.replace("#", "");
  if (m.length !== 6) return "#ffffff";
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#0a0a0a" : "#ffffff";
}

export function TagFilter({ tags, selected, onToggle, onClear, color }: TagFilterProps) {
  const { t } = useLanguage();
  if (tags.length === 0) return null;

  const onColor = getReadableOnColor(color);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <Filter size={13} />
          {t("filterByTag")}
        </div>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={onClear}
            data-testid="button-clear-filters"
            className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={12} />
            {t("clearFilters")}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("filterByTag")}>
        {tags.map((tag) => {
          const active = selected.has(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggle(tag)}
              aria-pressed={active}
              data-testid={`button-tag-${tag}`}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                active
                  ? "shadow-sm"
                  : "text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
              }`}
              style={
                active
                  ? {
                      color: onColor,
                      backgroundColor: color,
                      borderColor: color,
                    }
                  : undefined
              }
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
