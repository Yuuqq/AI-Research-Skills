import { useEffect } from "react";
import { Link } from "wouter";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

/**
 * 404 page. Static hosting can't return a real 404 status (everything
 * resolves to 200 via the SPA fallback), so we add a robots noindex meta
 * at runtime to keep accidental URLs out of search indexes.
 */
export default function NotFound() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    document.title = lang === "zh" ? "页面未找到 · AI Research Skills" : "Page Not Found · AI Research Skills";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, follow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, [lang]);

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-muted mb-6">
          <AlertCircle className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold mb-3">
          {lang === "zh" ? "页面未找到" : "Page not found"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {lang === "zh"
            ? "你访问的链接不存在，或这个技能可能已经迁移。"
            : "The page you’re looking for doesn’t exist, or has been moved."}
        </p>
        <Button asChild data-testid="link-home-from-404">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("home")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
