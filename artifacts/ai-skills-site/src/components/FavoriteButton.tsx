import { Star } from "lucide-react";
import { useUserPrefs } from "@/contexts/UserPrefsContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  skillKey: string;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Star toggle for favoriting a skill. Stops click propagation so it can sit
 * inside a clickable card without triggering navigation.
 */
export function FavoriteButton({ skillKey, size = "sm", className = "" }: Props) {
  const { isFavorite, toggleFavorite } = useUserPrefs();
  const { t } = useLanguage();
  const fav = isFavorite(skillKey);
  const dim = size === "md" ? 18 : 14;
  const pad = size === "md" ? "p-2" : "p-1.5";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(skillKey);
      }}
      aria-label={fav ? t("removeFromFavorites") : t("addToFavorites")}
      aria-pressed={fav}
      title={fav ? t("removeFromFavorites") : t("addToFavorites")}
      data-testid={`button-favorite-${skillKey.replace(/\//g, "-")}`}
      className={`${pad} rounded-md transition-colors ${
        fav
          ? "text-amber-400 hover:text-amber-300"
          : "text-muted-foreground/40 hover:text-amber-400"
      } ${className}`}
    >
      <Star size={dim} fill={fav ? "currentColor" : "none"} strokeWidth={2} />
    </button>
  );
}
