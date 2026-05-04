import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { marqueePhrasesZh } from "@/i18n/categoryLabels";

const phrasesEn = [
  "Architecture", "Tokenization", "Fine-Tuning", "Interpretability", "Data",
  "Post-Training", "Safety", "Distributed", "Infra", "Optimization",
  "Eval", "Serving", "MLOps", "Agents", "RAG", "Prompts",
  "Observe", "Multimodal", "Emerging", "Writing", "Ideation",
];

export function Marquee() {
  const { lang } = useLanguage();
  const phases = lang === "zh" ? marqueePhrasesZh : phrasesEn;

  return (
    <div className="relative flex overflow-hidden border-y border-border bg-card/50 py-4 font-mono text-sm tracking-tight text-muted-foreground uppercase">
      <div className="animate-marquee flex whitespace-nowrap items-center">
        {[...phases, ...phases, ...phases].map((phase, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-4">{phase}</span>
            <ArrowRight size={14} className="text-muted-foreground/40" />
          </div>
        ))}
      </div>
      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
