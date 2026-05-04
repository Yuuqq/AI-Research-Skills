import { useEffect, useState } from "react";

/**
 * Thin top progress bar that fills as the user scrolls down the page.
 * Pure CSS transform so it stays buttery-smooth on long pages.
 */
export function ReadingProgressBar({ color }: { color: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(pct);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-0.5 z-50 pointer-events-none"
    >
      <div
        className="h-full origin-left transition-transform duration-75 ease-out"
        style={{
          backgroundColor: color,
          transform: `scaleX(${progress})`,
          boxShadow: `0 0 8px ${color}80`,
        }}
      />
    </div>
  );
}
