import { useParams, Link, useLocation } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ArrowLeft,
  Check,
  Plus,
  Minus,
  Heart,
  ArrowLeftRight,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GiftLoader from "@/components/GiftLoader";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

function normalizeCategory(value?: string) {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation<{ from?: string }>();
  const { products, isLoading } = useProducts();
  const { addItem } = useCart();
  const product = products.find((p) => p.id === id);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const buildProductUrl = (productId: string) =>
    baseUrl ? `${baseUrl}/product/${productId}` : `/product/${productId}`;
  const fallbackImages = product?.productCode ? [`/product-images/${product.productCode}.jpg`] : [];
  const productImages = product?.images && product.images.length > 0 ? product.images : fallbackImages;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(product?.minOrderQty ?? 1);
  const [showNav, setShowNav] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const scrollThumbnails = (direction: "left" | "right") => {
    const container = thumbnailsRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const byCategory = products.filter(
      (p) => p.id !== product.id && p.category === product.category,
    );

    const byBundleSize = product.bundleSize
      ? products.filter(
          (p) =>
            p.id !== product.id &&
            p.bundleSize === product.bundleSize &&
            p.category !== product.category,
        )
      : [];

    const seen = new Set<string>();
    return [...byCategory, ...byBundleSize]
      .filter((p) => {
        if (seen.has(p.id)) {
          return false;
        }
        seen.add(p.id);
        return true;
      })
      .slice(0, 6);
  }, [products, product]);

  const backLink = location.state?.from ?? "/shop";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <GiftLoader message="Finding the perfect product wrap…" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Product not found
          </h1>
          <Link to={backLink} className="text-primary underline">
            Back to shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currency = product.currency ?? "INR";
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });
  const gstAmount = product.gstRate
    ? (product.price * product.gstRate) / 100
    : null;
  const discountedFromList =
    typeof product.listPrice === "number" &&
    typeof product.discountPercent === "number";

  const productLink = buildProductUrl(product.id);
  const whatsappMessage = encodeURIComponent(
    [
      "Hi! I'd like to place an order:",
      "",
      `🎁 *${product.name}*`,
      `🆔 Product ID: ${product.productCode ?? product.id}`,
      ...(product.variants?.length
        ? [`📦 Variant: ${product.variants[selectedVariant]}`]
        : []),
      ...(product.availableColors?.length
        ? [`🎨 Color: ${product.availableColors[selectedColor]}`]
        : []),
      `🔢 Quantity: ${quantity}`,
      `💰 Total: ${formatter.format(product.price * quantity)}`,
      `🔗 Product Link: ${productLink}`,
      "",
      "Please let me know the next steps!",
    ].join("\n"),
  );
  const whatsappUrl = `https://wa.me/9074145962?text=${whatsappMessage}`;
  const selectedColorName = product?.availableColors?.[selectedColor];
  const normalizedCategory = normalizeCategory(product.category);
  const woodenEngravingCategories = new Set(["wooden-engravings"]);
  const containCategories = new Set(["pens", "badges", ...woodenEngravingCategories]);
  const skipFitCategories = new Set(["gift-sets"]);
  const imageFitClass = skipFitCategories.has(normalizedCategory)
    ? ""
    : containCategories.has(normalizedCategory)
    ? "object-contain"
    : "object-cover";
  const isPen = normalizedCategory === "pens";
  const penContainerStyle = isPen ? { width: 796, height: 900 } : undefined;
  const mainAspectClass = isPen ? "aspect-[796/900]" : "aspect-[4/5] md:aspect-[3/4]";
  const isWoodenProduct =
    normalizedCategory === "keychains" && product.material?.toLowerCase().includes("wood");
  const detailTags = [
    ...(isWoodenProduct ? ["Wooden Desk Accessories"] : []),
    normalizedCategory === "keychains"
      ? "Keychains"
      : normalizedCategory === "pens"
      ? "Pens"
      : "Gift Sets",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">

        {/* IMAGE SECTION */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row gap-3"
            onMouseEnter={() => setShowNav(true)}
            onMouseLeave={() => setShowNav(false)}
          >
          {productImages.length > 1 && (
            <div className="hidden md:flex flex-col gap-2">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === i
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className={`w-full h-full ${imageFitClass} rounded-sm p-1`}
                  />
                </button>
              ))}
            </div>
          )}

          <div
            className={`relative w-full rounded-xl overflow-hidden bg-card ${mainAspectClass} max-h-[560px] shadow-sm border border-border cursor-zoom-in`}
            onClick={() => setLightboxOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={productImages[selectedImage]}
                alt={product.name}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.2 }}
                className={`absolute inset-0 w-full h-full ${product.category == "diaries"? "":""} ${product.category == "personalized-gifts" || product.category == "keychains"|| product.category == "diaries" ? "" : imageFitClass}`}
              />
            </AnimatePresence>

            {showNav && productImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage((i) => (i === 0 ? productImages.length - 1 : i - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-lg p-3 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((i) => (i === 0 ? productImages.length - 1 : i - 1));
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((i) => (i === productImages.length - 1 ? 0 : i + 1));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-lg p-3 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
          </>
            )}
          </div>

          {productImages.length > 1 && (
            <div className="md:hidden mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollThumbnails("left")}
                className="rounded-full bg-white border border-border shadow-sm p-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div
                ref={thumbnailsRef}
                className="flex-1 flex gap-2 overflow-x-auto scrollbar-none px-1 py-0.5"
              >
                {productImages.map((img, i) => (
                  <button
                    key={`mobile-${i}`}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className={`w-full h-full ${imageFitClass}`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollThumbnails("right")}
                className="rounded-full bg-white border border-border shadow-sm p-2"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>

        {/* LIGHTBOX */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 rounded-full bg-white/90 text-foreground shadow-lg p-3 hover:bg-white transition-colors"
              aria-label="Close full image"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-border/50 bg-card"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* PRODUCT INFO */}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col"
        >
          <h1 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
            {product.name}
          </h1>

          {product.description && (
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-2xl">
              {product.description}
            </p>
          )}

          {detailTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {detailTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-xl sm:text-2xl font-semibold text-primary">
            {formatter.format(product.price)}
          </p>

          {product.gstRate && (
            <p className="text-sm text-muted-foreground">
              GST @ {product.gstRate}% ({formatter.format(gstAmount)})
            </p>
          )}

          {discountedFromList && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm line-through text-muted-foreground">
                {formatter.format(product.listPrice)}
              </span>
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                {product.discountPercent}% OFF
              </span>
            </div>
          )}

          {/* COLORS */}

          <div className="mt-2">
            <p className="text-sm font-medium mb-2">Colors</p>

            <div className="flex flex-wrap gap-2">
              {product.availableColors?.map((c, i) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(i)}
                  className={`px-3 py-1 rounded-lg text-xs sm:text-sm border ${
                    selectedColor === i
                      ? "border-primary bg-primary/10"
                      : "border-border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT TABLE */}

          <div className="mt-2 border rounded-lg overflow-x-auto px-3">
            <table className="w-full min-w-[320px] text-sm ">
              <tbody className="divide-y">
                <tr>
                  <td className="py-2 font-medium text-muted-foreground">
                    Product Code
                  </td>
                  <td className="py-2">
                    {product.productCode || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="py-2 font-medium text-muted-foreground">
                    Material
                  </td>
                  <td className="py-2">
                    {product.material || "N/A"}
                  </td>
                </tr>
                {/* <tr>
                  <td className="py-2 font-medium text-muted-foreground">
                    Packing Type
                  </td>
                  <td className="py-2">
                    {product.packingType || "N/A"}
                  </td>
                </tr> */}

                <tr>
                  <td className="py-2 font-medium text-muted-foreground">
                    Master Carton
                  </td>
                  <td className="py-2">
                    {product.masterCarton || "N/A"}
                  </td>
                </tr>

                <tr>
                  <td className="py-2 font-medium text-muted-foreground">
                    Customized
                  </td>
                  <td className="py-2">
                    {product.customized || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* QUANTITY */}

          <div className="mt-2">
            <p className="text-sm font-medium mb-2">Quantity {product.minOrderQty && (
              <span className="text-xs text-muted-foreground mt-1">
               (Minimum order quantity: {product.minOrderQty})
              </span>
            )}</p>

            <div className="flex items-center gap-3 border rounded-lg px-2 py-1 w-fit">
              <button
                onClick={() =>
                  setQuantity(
                    Math.max(product.minOrderQty ?? 1, quantity - 1)
                  )
                }
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="font-semibold">{quantity}</span>

              <button onClick={() => setQuantity(quantity + 1)}>
                <Plus className="w-4 h-4" />
              </button>
            </div>

            
          </div>

          {/* ACTION BUTTONS */}

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                addItem({
                  productId: product.id,
                  quantity,
                  color: selectedColorName,
                });

                toast.success(`${product.name} added to cart`);
              }}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>

            <button className="flex items-center justify-center gap-2 border rounded-lg px-4 py-2">
              <Heart className="w-4 h-4" />
              Wishlist
            </button>
          </div>

          {/* WHATSAPP BUTTON */}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 w-full sm:w-auto flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            Order via WhatsApp
          </a>

          <p className="text-xs text-muted-foreground mt-2">
            You'll be redirected to WhatsApp to complete your order
          </p>
        </motion.div>
      </div>
    </div>

    {relatedProducts.length > 0 && (
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold">You may also like</h2>
          <Link
            to="/shop"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all products
          </Link>
        </div>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              index={index}
            />
          ))}
        </div>
      </section>
    )}

    <Footer />
  </div>
);

};

export default ProductDetail;
