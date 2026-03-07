import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.productId === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative rounded-xl overflow-hidden bg-card aspect-square mb-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full  group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
        <p className="text-primary font-semibold mt-2">${product.price.toFixed(2)}</p>
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
