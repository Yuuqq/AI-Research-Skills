import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = ["goals", "quick-start", "library", "paths"];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const [location] = useLocation();
  const { open: openSearch } = useSearch();

  const isHome = location === "/";
  const active = useActiveSection(isHome ? SECTION_IDS : [], 96);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { id: "goals", label: t("navGoals") },
    { id: "quick-start", label: t("navQuickStart") },
    { id: "library", label: t("navLibrary") },
    { id: "paths", label: t("navPaths") },
  ];

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "hsl(var(--background) / 0.78)" : "hsl(var(--background) / 0)",
        borderColor: scrolled ? "hsl(var(--border) / 0.6)" : "hsl(var(--border) / 0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
      }}
      transition={{ duration: 0.25 }}
      className="fixed top-0 inset-x-0 z-40 border-b"
      style={{ WebkitBackdropFilter: scrolled ? "blur(12px)" : undefined }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3 sm:gap-6">
        {/* Logo — fade in once scrolled (or always show on non-home pages) */}
        <motion.div
          animate={{ opacity: scrolled || !isHome ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href="/"
            data-testid="link-nav-home"
            className="flex items-center gap-2 font-bold text-sm shrink-0 hover:opacity-80 transition-opacity"
          >
            <Sparkles size={15} className="text-primary" />
            <span className="hidden sm:inline">AI Skills</span>
          </Link>
        </motion.div>

        {/* Desktop section jump links — only on home, only after scroll */}
        {isHome && (
          <motion.nav
            animate={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex items-center gap-1 text-sm"
            aria-hidden={!scrolled}
          >
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  data-testid={`link-nav-${link.id}`}
                  tabIndex={scrolled ? 0 : -1}
                  className={`relative px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-md bg-card border border-border"
                    />
                  )}
                </a>
              );
            })}
          </motion.nav>
        )}

        {/* Right cluster: search + toggles */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <button
            onClick={openSearch}
            data-testid="button-nav-search"
            aria-label={t("searchPlaceholder")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-md text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          >
            <Search size={13} />
            <kbd className="hidden md:inline-flex h-4 items-center rounded border bg-background/60 px-1 font-mono text-[10px] leading-none">⌘K</kbd>
          </button>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile section jump strip — second row, scrollable */}
      {isHome && (
        <motion.div
          animate={{
            height: scrolled ? "auto" : 0,
            opacity: scrolled ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden border-t border-border/40"
          aria-hidden={!scrolled}
        >
          <div className="flex gap-1.5 px-4 py-2 overflow-x-auto whitespace-nowrap [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  data-testid={`link-mobile-nav-${link.id}`}
                  tabIndex={scrolled ? 0 : -1}
                  className={`shrink-0 px-3 py-1 rounded-full text-xs border transition-colors ${
                    isActive
                      ? "bg-primary/10 border-primary/40 text-foreground"
                      : "bg-card/60 border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
