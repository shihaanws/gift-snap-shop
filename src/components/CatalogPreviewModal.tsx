import { DownloadIcon, X } from "lucide-react";
import type { CatalogPdf } from "@/data/catalogs";

interface CatalogPreviewModalProps {
  catalog: CatalogPdf;
  onClose: () => void;
}

const CatalogPreviewModal = ({ catalog, onClose }: CatalogPreviewModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
    <div className="relative w-full max-w-5xl rounded-[32px] bg-white shadow-2xl">
      <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Catalog Preview
          </p>
          <h3 className="text-lg font-semibold text-foreground">{catalog.label}</h3>
          <p className="text-xs text-muted-foreground">{catalog.description}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-border/70 p-2 text-muted-foreground transition hover:border-border hover:text-foreground"
          aria-label="Close catalog preview"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <iframe
        src={catalog.pdfUrl}
        title={catalog.label}
        className="h-[70vh] w-full min-h-[400px] border-0"
      />
      <div className="flex items-center justify-between gap-2 border-t border-border px-6 py-4">
        <a
          href={catalog.pdfUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <DownloadIcon className="h-4 w-4" />
          Download PDF
        </a>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default CatalogPreviewModal;
