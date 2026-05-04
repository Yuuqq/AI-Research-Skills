import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      data-testid="button-language-toggle"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-md text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all hover:shadow-[0_0_12px_rgba(99,102,241,0.2)] select-none"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={lang}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-1.5"
        >
          {lang === "en" ? (
            <>
              <span className="text-base leading-none">🇨🇳</span>
              <span className="hidden sm:inline">中文</span>
            </>
          ) : (
            <>
              <span className="text-base leading-none">🇺🇸</span>
              <span className="hidden sm:inline">English</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
