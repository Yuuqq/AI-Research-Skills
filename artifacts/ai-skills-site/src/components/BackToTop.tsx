import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 16 }}
          transition={{ duration: 0.18 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="button-back-to-top"
          aria-label={t("backToTop")}
          title={t("backToTop")}
          className="fixed bottom-5 right-5 z-30 w-11 h-11 rounded-full border border-border bg-card/90 backdrop-blur-md shadow-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:-translate-y-0.5 transition-all"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
