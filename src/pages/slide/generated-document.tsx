import { Download, Copy, RefreshCw, CheckCircle, FileText, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface GeneratedDocumentProps {
  content: string;
  topic: string;
  documentType: string;
  onRegenerate: () => void;
  isLoading: boolean;
}

const GeneratedDocument = ({
  content,
  topic,
  documentType,
  onRegenerate,
  isLoading,
}: GeneratedDocumentProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Matn buferga nusxalandi");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.slice(0, 30)}_${documentType}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Hujjat yuklab olindi");
  };

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-teal-400 flex items-center justify-center">
            <FileText className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Hujjat tayyor!
            </h2>
            <p className="text-sm text-muted-foreground">AI tomonidan yaratildi</p>
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            Qayta yaratish
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
            {copied ? (
              <CheckCircle className="w-4 h-4 text-accent" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Nusxalandi" : "Nusxalash"}
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Ulashish
          </Button>
          <Button variant="gradient" size="sm" onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Yuklab olish
          </Button>
        </div>
      </div>

      {/* Document content */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary to-pink-500 rounded-2xl opacity-20 blur group-hover:opacity-30 transition-opacity" />
        <div className="relative glass-card rounded-2xl p-8 max-h-[600px] overflow-y-auto">
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed font-mono text-sm">
              {content}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span>{content.split(/\s+/).length} so'z</span>
        <span>{content.length} belgi</span>
        <span>{content.split('\n').length} qator</span>
      </div>
    </div>
  );
};

export default GeneratedDocument;
