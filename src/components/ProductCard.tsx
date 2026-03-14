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
  const cardAspectClass = isPenCard ? "aspect-[796/900]" : "aspect-square";
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
      <Link
        to={`/product/${product.id}`}
        state={{ from: `${location.pathname}${location.search}` }}
        className="group block"
      >
        <div
          className={`relative rounded-xl overflow-hidden bg-card ${cardAspectClass} mb-3 border border-border/80 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/70 transform group-hover:scale-[1.05]`}
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
            className={`w-full h-full transition-transform duration-300 group-hover:scale-100 ${product.category === "diaries" ? "" : imageFitClass}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/30" />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {isWoodenProduct && (
          <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Wooden Products
          </span>
        )}
        {product.productCode && (
          <p className="mt-1 text-sm font-semibold text-primary tracking-wide uppercase">
            {product.productCode}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
        <p className="text-primary font-semibold mt-2">Rs. {product.price.toFixed(2)}</p>
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
        className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-secondary"
      >
        <ShoppingCart className="h-4 w-4" />
        {isInCart ? "Go to Cart" : "Add to Cart"}
      </button>
    </motion.div>
  );
};

export default ProductCard;
