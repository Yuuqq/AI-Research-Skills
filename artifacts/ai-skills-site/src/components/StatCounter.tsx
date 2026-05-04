import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function StatCounter({ end, label, prefix = "", suffix = "" }: { end: number; label: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number;
    const duration = 2000;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, isInView]);

  // Handle infinity specially
  const displayCount = end === Infinity ? "∞" : count;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
        {prefix}{displayCount}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
        {label}
      </div>
    </div>
  );
}
