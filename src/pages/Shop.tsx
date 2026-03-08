import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const { products } = useProducts();
  const { categories } = useCategories();

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Corporate Product Catalog</h1>
        <p className="text-muted-foreground mb-8">Explore bulk gifting products for clients, teams, and events</p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
