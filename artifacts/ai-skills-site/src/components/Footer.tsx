import { Github, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-mono text-center md:text-left">{t("footerTagline")}</div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a
            href="https://github.com/Yuuqq/AI-Research-Skills"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-footer-github"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
          <span className="font-mono text-xs">MIT License</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs">
            <Heart size={12} className="text-rose-500" />
            {t("footerBuiltBy")}
          </span>
        </div>
      </div>
    </footer>
  );
}
