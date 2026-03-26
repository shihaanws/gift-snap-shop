import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  DownloadIcon,
  Minus,
  Plus,
  ShoppingCart,
  Share2,
  ZoomIn,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { catalogPdfs } from "@/data/catalogs";

const detailProduct = {
  id: "sublimation-mugs-mug-detail",
  name: "Engraving UV Sticker Sublimation Mugs",
  description:
    "Dual-tone ceramic mug with premium gloss finish, branded for corporate gifting & events.",
  price: 249,
  productCode: "NEWCAT-GL-01",
  minOrderQty: 12,
  images: ["/images/mugs1.jpg", "/images/mugs2.jpg"],
};

const whatsappNumber = "9074145962";

const SublimationMugs = () => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(detailProduct.minOrderQty);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [sharing, setSharing] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const catalogPdf = catalogPdfs.find((item) => item.id === "corporate-mugs");

  const goToPreviousImage = () => {
    setSelectedImageIndex((current) =>
      current === 0 ? detailProduct.images.length - 1 : current - 1,
    );
  };

  const goToNextImage = () => {
    setSelectedImageIndex((current) =>
      current === detailProduct.images.length - 1 ? 0 : current + 1,
    );
  };

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://emotionskerala.com";
  const productLink = `${origin}/sublimation-mugs`;
  const whatsappMessage = encodeURIComponent(
    `Hello! I want to order "${detailProduct.name}" (${detailProduct.productCode}) from your Sublimation collection. ${productLink}`,
  );
  const enquiryMessage = encodeURIComponent(
    `Hello! Please share pricing for "${detailProduct.name}" (${detailProduct.productCode}). ${productLink}`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const enquiryUrl = `https://wa.me/${whatsappNumber}?text=${enquiryMessage}`;

  const handleShareLink = async () => {
    try {
      setSharing(true);
      await navigator.clipboard?.writeText(productLink);
      toast.success("Product link copied to clipboard");
    } catch {
      toast.error("Unable to copy link");
    } finally {
      setSharing(false);
    }
  };

  const handleAddToCart = () => {
    addItem({ productId: detailProduct.id, quantity });
    toast.success(`${detailProduct.name} added to cart`);
  };

  const heroImage = detailProduct.images[selectedImageIndex];
  const openZoom = () => setZoomOpen(true);
  const closeZoom = () => setZoomOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto flex flex-col gap-2 px-1 py-2">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          {catalogPdf && (
            <a
              href={catalogPdf.pdfUrl}
              download
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-400 transition"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Catalog
            </a>
          )}
        </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:flex-row">
                <div
                  className="relative flex-1 overflow-hidden rounded-[32px] border border-border bg-white shadow-xl cursor-zoom-in group"
                  onClick={openZoom}
                >
                  <img
                    src={heroImage}
                    alt={detailProduct.name}
                    className="h-[70vh] w-full object-contain lg:h-[80vh]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/60 p-3 text-white opacity-0 transition group-hover:opacity-100">
                      <ZoomIn className="h-6 w-6" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goToPreviousImage();
                    }}
                    className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white text-foreground shadow-lg transition hover:scale-110 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goToNextImage();
                    }}
                    className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white text-foreground shadow-lg transition hover:scale-110 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                <div className="hidden lg:flex flex-col gap-3">
                  {detailProduct.images.map((imageUrl, index) => (
                  <button
                    key={`thumb-${imageUrl}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(index)}
                    className={`h-16 w-16 rounded-2xl border transition ${
                      selectedImageIndex === index
                        ? "border-primary scale-105"
                        : "border-border/60"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`${detailProduct.name} thumbnail ${index + 1}`}
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 lg:hidden">
              {detailProduct.images.map((imageUrl, index) => (
                <button
                  key={`mobile-thumb-${imageUrl}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`h-14 w-14 rounded-2xl border transition ${
                    selectedImageIndex === index
                      ? "border-primary scale-105"
                      : "border-border/60"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`${detailProduct.name} thumbnail ${index + 1}`}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                Sublimation Mugs
              </p>
              <h1 className="font-display text-4xl font-bold text-foreground">
                {detailProduct.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {detailProduct.description}
              </p>
            </div>
            <div className="space-y-4 rounded-2xl border border-border bg-white/80 p-6 shadow-sm">
              {/* <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  Price
                </span>
                <span className="text-3xl font-semibold text-foreground">
                  ₹{detailProduct.price.toFixed(2)}
                </span>
              </div> */}
              <div className="text-sm text-muted-foreground">
                Product code: {detailProduct.productCode}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Quantity
                  <span className="text-xs text-muted-foreground ml-2">
                    (Min {detailProduct.minOrderQty})
                  </span>
                </p>
                <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 w-fit">
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(detailProduct.minOrderQty, quantity - 1),
                      )
                    }
                    className="text-muted-foreground"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-muted-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <button
                  onClick={handleShareLink}
                  className="flex items-center justify-center gap-2 border border-border px-4 py-3 rounded-lg font-semibold text-foreground"
                >
                  <Share2 className="h-4 w-4" />
                  {sharing ? "Copied" : "Copy product link"}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold"
                >
                  <i className="fab fa-whatsapp text-base" aria-hidden="true" />
                  Order via WhatsApp
                </a>
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-border px-4 py-3 rounded-lg font-semibold text-foreground"
                >
                  <Share2 className="h-4 w-4" />
                  Enquire via WhatsApp
                </a>
                
              </div>
              <p className="text-xs text-muted-foreground hidden sm:block">
                WhatsApp opens with your order details automatically filled.
              </p>
            </div>
          </div>
        </div>
        {zoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="relative max-h-full w-full max-w-[90vw]">
              <div className="flex h-full w-full items-center justify-center overflow-auto rounded-3xl bg-white/5 p-2">
                <img
                  src={heroImage}
                  alt={`Zoomed ${detailProduct.name}`}
                  className="max-h-[90vh] max-w-[90vw] rounded-3xl object-contain"
                />
              </div>
              <button
                type="button"
                onClick={closeZoom}
                aria-label="Close zoomed image"
                className="absolute top-4 right-4 rounded-full bg-white/90 p-2 text-foreground shadow-lg transition hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </main>

      <div className="sticky bottom-0 left-0 right-0 z-40 sm:hidden bg-background border-t border-border px-4 py-3 flex flex-col gap-2">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-semibold text-sm"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl font-semibold text-sm"
          >
            <i className="fab fa-whatsapp text-base" aria-hidden="true" />
            Order Now
          </a>
          <a
            href={enquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border border-border px-4 py-3 rounded-xl font-semibold text-sm text-foreground"
          >
            <Share2 className="h-4 w-4" />
            Enquire Now
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SublimationMugs;
