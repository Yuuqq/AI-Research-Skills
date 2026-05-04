import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      data-testid="button-theme-toggle"
      aria-label="Toggle theme"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-md text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all hover:shadow-[0_0_12px_rgba(99,102,241,0.2)] select-none"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5"
        >
          {theme === "dark" ? (
            <>
              <Sun size={13} />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon size={13} />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
