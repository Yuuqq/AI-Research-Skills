import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CopyableCommandProps {
  command: string;
  color: string;
}

export function CopyableCommand({ command, color }: CopyableCommandProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(command);
      } else {
        const ta = document.createElement("textarea");
        ta.value = command;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative rounded-lg border border-border bg-muted/30 overflow-hidden group">
      <pre className="px-4 py-3 pr-14 font-mono text-sm text-foreground overflow-x-auto whitespace-pre">
        <span style={{ color }}>$</span> {command}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? t("copied") : t("copy")}
        data-testid="button-copy-command"
        className="absolute top-2 right-2 inline-flex items-center justify-center w-9 h-9 rounded-md border border-border bg-background/90 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all"
      >
        {copied ? <Check size={16} style={{ color }} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
