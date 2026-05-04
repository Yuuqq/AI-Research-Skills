import { Link } from "wouter";
import { motion } from "framer-motion";
import { Cpu, Type, Zap, Search, Database, Activity, Shield, Layers, Server, TrendingUp, BarChart, GitBranch, Lightbulb, Brain, Image, FileText, MessageSquare, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { categoryLabelsZh, categoryDescsZh } from "@/i18n/categoryLabels";

const IconMap: Record<string, React.ElementType> = {
  "cpu": Cpu,
  "type": Type,
  "zap": Zap,
  "search": Search,
  "database": Database,
  "activity": Activity,
  "shield": Shield,
  "layers": Layers,
  "server": Server,
  "trending-up": TrendingUp,
  "bar-chart": BarChart,
  "git-branch": GitBranch,
  "lightbulb": Lightbulb,
  "brain": Brain,
  "image": Image,
  "file-text": FileText,
  "message-square": MessageSquare,
  "eye": Eye,
};

interface CategoryCardProps {
  category: {
    slug: string;
    label: string;
    color: string;
    count: number;
    desc: string;
    icon: string;
  };
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = IconMap[category.icon] || Cpu;
  const { lang, t } = useLanguage();

  const label = lang === "zh" ? (categoryLabelsZh[category.slug] ?? category.label) : category.label;
  const desc = lang === "zh" ? (categoryDescsZh[category.slug] ?? category.desc) : category.desc;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <Link href={`/category/${category.slug}`}>
        <div
          className="group shimmer-card relative flex flex-col h-full rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          style={{ "--card-accent": category.color } as React.CSSProperties}
          data-testid={`card-category-${category.slug}`}
        >
          <div
            className="absolute top-0 left-0 w-full h-1 opacity-70 group-hover:opacity-100 transition-opacity rounded-t-xl"
            style={{ backgroundColor: category.color }}
          />

          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-background border border-border">
              <IconComponent size={24} style={{ color: category.color }} />
            </div>
            <div
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border"
              style={{ color: category.color, borderColor: `${category.color}40`, backgroundColor: `${category.color}10` }}
            >
              {category.count} {t("skillsCount")}
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-white transition-colors">{label}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mt-auto">{desc}</p>
        </div>
      </Link>
    </motion.div>
  );
}
