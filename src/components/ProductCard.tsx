import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.productId === product.id);
  const primaryImage = product.images?.[0] || (product.productCode ? `/product-images/${product.productCode}.jpg` : "");
  const shouldAnimate = !reduceMotion && index < 24; // avoid costly animations on long lists

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={shouldAnimate ? { once: true } : undefined}
      transition={shouldAnimate ? { duration: 0.35, delay: Math.min(index * 0.06, 0.4) } : undefined}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative rounded-xl overflow-hidden bg-card aspect-square mb-3 border border-border/80 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/70 transform group-hover:scale-[1.05]">
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            fetchPriority={index < 4 ? "high" : "auto"}
            className="w-full h-full transition-transform duration-300 group-hover:scale-100"
          />
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/30" />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
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
