import { X, Download, ExternalLink, FileText, Sheet, FileCheck2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DocumentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    title: string;
    description: string;
    date: string;
    format: string;
    size: string;
    url: string;
  } | null;
}

const formatIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  docx: FileCheck2,
  xlsx: Sheet,
};

export const DocumentPreview = ({ isOpen, onClose, document }: DocumentPreviewProps) => {
  if (!document) return null;

  const IconComponent = formatIcons[document.format] || FileText;
  const isPdf = document.format === "pdf";

  const formatColors: Record<string, string> = {
    pdf: "bg-red-50 border-red-100 text-red-600",
    docx: "bg-blue-50 border-blue-100 text-blue-600",
    xlsx: "bg-green-50 border-green-100 text-green-600",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0 [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${formatColors[document.format] || "bg-muted border-border text-muted-foreground"}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{document.title}</h3>
              <p className="text-xs text-muted-foreground">
                {document.format.toUpperCase()}, {document.size}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={document.url}
              download
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Скачать
            </a>
            <a
              href={document.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="h-[70vh] bg-muted">
          {isPdf ? (
            <iframe
              src={`${document.url}#toolbar=0`}
              className="w-full h-full"
              title={document.title}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${formatColors[document.format] || "bg-muted border border-border"}`}>
                <IconComponent className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-medium text-foreground mb-2">
                Предпросмотр недоступен
              </h4>
              <p className="text-sm text-muted-foreground mb-6 max-w-md">
                Файлы формата {document.format.toUpperCase()} не поддерживают предпросмотр в браузере. 
                Скачайте документ для просмотра.
              </p>
              <a
                href={document.url}
                download
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors"
              >
                <Download className="w-4 h-4" />
                Скачать {document.format.toUpperCase()}
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};