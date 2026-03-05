import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/use-products";

const FeaturedProducts = () => {
  const { products } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-card py-20">
      <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-gold-light/30 blur-3xl" />
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Top Picks</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Corporate Bestsellers</h2>
          <p className="text-muted-foreground text-lg">Most requested products for bulk gifting programs</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center rounded-lg border border-primary/35 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
