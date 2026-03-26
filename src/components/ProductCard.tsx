import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";

function normalizeCategory(value?: string) {
  if (!value) return "";
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.productId === product.id);
  const primaryImage = product.images?.[0] || (product.productCode ? `/product-images/${product.productCode}.jpg` : "");
  const normalizedCategory = normalizeCategory(product.category);
  const woodenEngravingCategories = new Set(["wooden-engravings"]);
  const objectContainCategories = new Set(["keychains", "pens", "badges"]);
  const skipFitCategories = new Set(["gift-sets"]);
  const shouldContainImage =
    objectContainCategories.has(normalizedCategory) ||
    woodenEngravingCategories.has(normalizedCategory);
  const imageFitClass = skipFitCategories.has(normalizedCategory)
    ? ""
    : shouldContainImage
    ? "object-contain"
    : "object-cover";
  const isPenCard = normalizedCategory === "pens";
  
  const cardAspectClass = isPenCard
    ? "aspect-[796/900]"
    : "aspect-[9/10] sm:aspect-square";
  
  const shouldAnimate = !reduceMotion && index < 24; // avoid costly animations on long lists
  const [imageLoaded, setImageLoaded] = useState(false);
  const isWoodenProduct =
    normalizedCategory === "keychains" && product.material?.toLowerCase().includes("wood");

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={shouldAnimate ? { once: true } : undefined}
      transition={shouldAnimate ? { duration: 0.35, delay: Math.min(index * 0.06, 0.4) } : undefined}
    >
      <div  className=" h-[100%] border border-border/30 rounded-3xl bg-white p-3 transition sm:border-none sm:p-0 sm:bg-card sm:shadow-sm">
        <Link
          to={`/product/${product.id}`}
          state={{ from: `${location.pathname}${location.search}` }}
          className="group block"
        >
          <div
            className={`relative rounded-2xl overflow-hidden ${cardAspectClass} border border-border/80 bg-card transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5 group-hover:border-primary/70 transform group-hover:scale-[1.05]`}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse rounded-md bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
            )}
            <img
              src={primaryImage}
              alt={product.name}
              loading="lazy"
              decoding="async"
              fetchPriority={index < 4 ? "high" : "auto"}
              className={`w-full h-full transition-transform duration-300 group-hover:scale-100 ${product.category === "diaries" || product.category === "desktop-lifetime-calenders" || product.category === "business-card-holders" ? "" : imageFitClass}`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/30" />
          </div>
        </Link>
        <div className="mt-3 flex items-center justify-between gap-3">
          <Link
            to={`/product/${product.id}`}
            state={{ from: `${location.pathname}${location.search}` }}
            className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate min-w-0"
          >
            {product.name}
          </Link>
          <button
            type="button"
            onClick={() => {
              if (isInCart) {
                navigate("/cart");
                return;
              }
              addItem({ productId: product.id, quantity: 1 });
              toast.success(`${product.name} added to cart`);
            }}
            className="hidden sm:inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-secondary"
          >
            <ShoppingCart className="h-4 w-4" />
            {isInCart ? "Go to Cart" : "Add to Cart"}
          </button>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3 text-sm">
          {/* {isWoodenProduct && (
            <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Wooden Products
            </span>
          )} */}
          <p className="text-sm font-semibold text-gold tracking-wide uppercase">
            {product.productCode ?? "PROD_CODE"}
          </p>
          {product.price > 0 && (
            <p className="text-foreground font-semibold">
              <span className="text-lg leading-tight">₹</span>{" "}
              {product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
