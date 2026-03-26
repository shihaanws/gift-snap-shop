export type CatalogPdf = {
  id: string;
  label: string;
  description: string;
  pdfUrl: string;
  accent: string;
};

export const catalogPdfs: CatalogPdf[] = [
  {
    id: "corporate-mugs",
    label: "Corporate Mugs",
    description: "Custom-printed ceramic and steel mugs for gifting sprees.",
    pdfUrl: "/pdfs/corporate-mugs.pdf",
    accent: "from-primary/80 to-secondary/80",
  },
  {
    id: "aluminium-frames",
    label: "Aluminium Frames",
    description: "Brushed and polished frames with precision finishing.",
    pdfUrl: "/pdfs/aluminium-frames.pdf",
    accent: "from-emerald-500/80 to-emerald-800/90",
  },
  {
    id: "wooden-engravings",
    label: "Wooden Engravings",
    description: "Heritage wood grains etched with logos or messages.",
    pdfUrl: "/pdfs/wooden-engravings.pdf",
    accent: "from-amber-500/80 to-orange-900/90",
  },
  {
    id: "sublimation-products",
    label: "Sublimation",
    description: "All-over printed apparel and accessories for events.",
    pdfUrl: "/pdfs/sublimation-products.pdf",
    accent: "from-purple-500/80 to-violet-900/90",
  },
];
