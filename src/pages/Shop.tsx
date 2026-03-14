import { useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { DownloadIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

function normalizeCategory(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const ITEMS_PER_PAGE = 12;

const KeychainStyles = ["wooden", "metal"] as const;
type KeychainStyle = "" | (typeof KeychainStyles)[number];

const DiarySubcategories = ["planner-diary", "notebook-diary"] as const;
type DiarySubcategory = "" | (typeof DiarySubcategories)[number];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeBundle = searchParams.get("bundle");
  const activeCategoryRaw = searchParams.get("category") || (activeBundle ? "gift-sets" : "all");
  const activeCategory = activeCategoryRaw;
  const activeCategoryNormalized = normalizeCategory(activeCategoryRaw);
  const styleParamRaw = searchParams.get("style");
  const normalizeStyleParam = (value: string | null): KeychainStyle => {
    if (value === "wooden" || value === "metal") {
      return value;
    }
    return "";
  };
  const styleParam = normalizeStyleParam(styleParamRaw);
  const subcategoryParamRaw = searchParams.get("subcategory");
  const normalizeDiarySubcategory = (value: string | null): DiarySubcategory => {
    if (value === "planner-diary" || value === "notebook-diary") return value;
    return "";
  };
  const diarySubcategoryParam = normalizeDiarySubcategory(subcategoryParamRaw);
  const { products } = useProducts();
  const { categories } = useCategories();
  const isGiftSets = activeCategoryNormalized === "gift-sets";
  const isDiaries = activeCategoryNormalized === "diaries";
  const [currentPage, setCurrentPage] = useState(1);
  const [keychainOption, setKeychainOption] = useState<KeychainStyle>(styleParam);
  const updateSearchParams = (modifier: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams);
    modifier(params);
    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") {
      const target = activeCategoryNormalized;
      result = result.filter((p) => normalizeCategory(p.category) === target);
    }
    if (isDiaries && diarySubcategoryParam) {
      result = result.filter(
        (p) => normalizeCategory(p.subcategory ?? "") === diarySubcategoryParam
      );
    }
    if (activeCategoryNormalized === "keychains" && keychainOption) {
      result = result.filter((p) => {
        if (!p.material) return false;
        const normalizedMaterial = p.material.toLowerCase();
        if (keychainOption === "wooden") {
          return normalizedMaterial.includes("wood");
        }
        if (keychainOption === "metal") {
          return normalizedMaterial.includes("metal") || normalizedMaterial.includes("steel");
        }
        return true;
      });
    }
    if (isGiftSets && activeBundle) {
      const bundleNumber = Number(activeBundle);
      result = result.filter((p) => p.bundleSize === bundleNumber);
    }
    if (isGiftSets) {
      const giftSetResults = [...result];
      if (!activeBundle) {
        return shuffleArray(giftSetResults);
      }
      return giftSetResults.sort((a, b) => a.id.localeCompare(b.id));
    }
    if (activeCategoryNormalized === "keychains") {
      const keychainResults = [...result];
      if (!keychainOption) {
        return shuffleArray(keychainResults);
      }
      return keychainResults;
    }
    if (isDiaries && !diarySubcategoryParam) {
      return shuffleArray([...result]);
    }
    if (activeCategory === "all") {
      return shuffleArray(result);
    }
    return result;
  }, [activeCategory, activeCategoryNormalized, activeBundle, isGiftSets, isDiaries, diarySubcategoryParam, keychainOption, products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeBundle, diarySubcategoryParam]);

  useEffect(() => {
    if (activeCategoryNormalized !== "keychains" && keychainOption) {
      setKeychainOption("");
    }
  }, [activeCategoryNormalized, keychainOption]);

  useEffect(() => {
    if (styleParam !== keychainOption) {
      setKeychainOption(styleParam);
    }
  }, [styleParam, keychainOption]);

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

  const handleKeychainStyle = (style: KeychainStyle) => {
    updateSearchParams((params) => {
      params.set("category", "keychains");
      if (style) {
        params.set("style", style);
      } else {
        params.delete("style");
      }
    });
    setKeychainOption(style);
  };

  const highlightBadgeSection = () => {
    updateSearchParams((params) => {
      params.set("category", "badges");
      params.delete("bundle");
      params.delete("style");
    });
  };

  return (
    <div className="min-h-screen listing-background">
      <Navbar />
      <div className="container mx-auto px-4 py-4">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">Corporate Product Catalog</h1>
        <p className="text-muted-foreground mb-4">Explore bulk gifting products for clients, teams, and events</p>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-4">
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
              onClick={() => {
                updateSearchParams((params) => {
                  params.set("category", cat.id);
                  params.delete("bundle");
                  if (cat.id !== "keychains") {
                    params.delete("style");
                  }
                  if (cat.id !== "diaries") {
                    params.delete("subcategory");
                  }
                });
              }}
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
       
        {isDiaries && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Diary type:</span>
            <Tabs
              value={diarySubcategoryParam || "all"}
              onValueChange={(value) => {
                updateSearchParams((params) => {
                  params.set("category", "diaries");
                  if (value === "all") {
                    params.delete("subcategory");
                  } else {
                    params.set("subcategory", value);
                  }
                });
              }}
            >
              <TabsList className="rounded-sm border border-border bg-secondary/10 p-1">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="planner-diary">Planner Diary</TabsTrigger>
                <TabsTrigger value="notebook-diary">Notebook Diary</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {activeCategoryNormalized === "keychains" && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground ">
              Keychain style:
            </span>
            <Tabs
              value={keychainOption || "all"}
              onValueChange={(value) => handleKeychainStyle(value === "all" ? "" : (value as KeychainStyle))}
            >
              <TabsList className="rounded-sm border border-border bg-secondary/10 p-1">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="wooden">Wooden</TabsTrigger>
                <TabsTrigger value="metal">Metal</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* <div className="mb-6 rounded-2xl border border-border bg-white/80 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Badges</p>
          <p className="mt-2 text-lg font-semibold text-foreground">Premium enamel and metal badges for recognition, events, and campaigns.</p>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
            Mix-and-match finishes and engraving-ready panels let you brand each badge for teams, awards, and promotional giveaways.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={highlightBadgeSection}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              View Badge Collection
            </button>
          </div>
        </div> */}

        {isGiftSets && bundleOptions.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-4 justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Bundle size:
              </span>
              <Tabs
                value={activeBundle ?? "all"}
                onValueChange={(value) => {
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("category", "gift-sets");
                    if (value === "all") {
                      params.delete("bundle");
                    } else {
                      params.set("bundle", value);
                    }
                    return params;
                  });
                }}
              >
                <TabsList className="rounded-sm border border-border bg-secondary/10 p-1">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {bundleOptions.map((size) => (
                    <TabsTrigger key={size} value={String(size)}>
                      {size} in 1
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
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
