import { useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { DownloadIcon } from "lucide-react";

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeBundle = searchParams.get("bundle");
  const activeCategoryRaw = searchParams.get("category") || (activeBundle ? "gift-sets" : "all");
  const activeCategory = activeCategoryRaw;
  const activeCategoryNormalized = normalizeCategory(activeCategoryRaw);
  const { products } = useProducts();
  const { categories } = useCategories();
  const isGiftSets = activeCategoryNormalized === "gift-sets";
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      const target = activeCategoryNormalized;
      result = result.filter((p) => normalizeCategory(p.category) === target);
    }
    if (isGiftSets && activeBundle) {
      const bundleNumber = Number(activeBundle);
      result = result.filter((p) => p.bundleSize === bundleNumber);
    }
    return result;
  }, [activeCategory, activeBundle, isGiftSets, products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeBundle]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const bundleOptions = useMemo(() => {
    if (!isGiftSets) return [];
    // Show the full expected range even if some sizes are not yet present in data
    return [2, 3, 4, 5, 6];
  }, [isGiftSets]);

  return (
    <div className="min-h-screen listing-background">
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
              normalizeCategory(cat.id) === activeCategoryNormalized
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10"
            }`}
          >
            {cat.name}
            </button>
          ))}
        </div>

        {isGiftSets && bundleOptions.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Bundle size:</span>
              <button
                onClick={() => setSearchParams({ category: "gift-sets" })}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  !activeBundle
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                All
              </button>
              {bundleOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSearchParams({ category: "gift-sets", bundle: String(size) })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeBundle === String(size)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                  }`}
                >
                  {size} in 1
                </button>
              ))}
            </div>
            {activeBundle === "2" && (
              <a
                href="/catalogs/2 IN 1 GIFT SET E-CATALOGUE-2026.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <DownloadIcon className="w-4 h-4" />
                Download 2 in 1 Giftsets Catalog
              </a>
            )}
          </div>
        )}

        {paginatedProducts.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">No products found in this category.</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {paginatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 py-6">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="rounded-full border border-border px-3 py-1 text-sm font-medium transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                        currentPage === page
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-white text-foreground hover:border-primary"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="rounded-full border border-border px-3 py-1 text-sm font-medium transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
