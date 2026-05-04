import { useEffect, useMemo, useState } from "react";

/**
 * Tracks which section anchor is currently active based on scroll position.
 * The active section is the one whose anchor div has crossed the offset line
 * from the top of the viewport but is still highest above the fold.
 *
 * Works with zero-height anchor divs (e.g. <div id="goals" />).
 */
export function useActiveSection(ids: string[], offset = 80): string | null {
  const [active, setActive] = useState<string | null>(null);
  // Stabilize the ids array identity across re-renders so callers don't have
  // to memoize themselves. The hook only re-binds listeners when the actual
  // list of ids (or the offset) changes.
  const key = ids.join("|");
  const stableIds = useMemo(() => ids, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stableIds.length === 0) {
      setActive(null);
      return;
    }
    let raf = 0;
    const update = () => {
      let best: string | null = null;
      let bestTop = -Infinity;
      for (const id of stableIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - offset;
        // pick the highest anchor that is at or above the offset line
        if (top <= 0 && top > bestTop) {
          best = id;
          bestTop = top;
        }
      }
      setActive(best);
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
  }, [stableIds, offset]);

  return active;
}
