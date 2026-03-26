import type { CatalogPdf } from "@/data/catalogs";
import { DownloadIcon } from "lucide-react";

interface CatalogGalleryProps {
  catalogs: CatalogPdf[];
  onPreview: (catalog: CatalogPdf) => void;
  className?: string;
}

const CatalogGallery = ({ catalogs, onPreview, className }: CatalogGalleryProps) => (
  <section className={className}>
    <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Catalog PDFs
        </p>
        <h2 className="text-xl font-semibold text-foreground">
          Preview and download our ready-to-print category books
        </h2>
      </div>
      <span className="text-xs font-semibold text-muted-foreground">
        Tap to view each page or download the full guide
      </span>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {catalogs.map((catalog) => (
        <div
          key={catalog.id}
          className="flex h-full flex-col rounded-3xl border border-border bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            className={`relative h-32 w-full overflow-hidden rounded-t-3xl bg-gradient-to-br ${catalog.accent} text-white`}
          >
            <div className="absolute right-3 top-3 rounded-full border border-white/60 px-3 py-1 text-xs uppercase tracking-[0.2em]">
              PDF
            </div>
            <div className="flex h-full flex-col justify-end p-4 text-sm font-semibold">
              <span className="text-lg">{catalog.label}</span>
              <span className="text-xs text-white/70">Downloadable PDF</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <p className="text-sm text-muted-foreground">{catalog.description}</p>
            <div className="mt-auto flex gap-2">
              <button
                type="button"
                onClick={() => onPreview(catalog)}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary/10"
              >
                Preview
              </button>
              <a
                href={catalog.pdfUrl}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
              >
                <DownloadIcon className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CatalogGallery;
