import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as seedProducts } from "@/data/products";
import type { Product } from "@/data/products";

const STORAGE_KEY = "gift-snap-shop-products";

interface ProductContextValue {
  products: Product[];
  addOrUpdateProduct: (product: Product) => void;
  addOrUpdateMany: (nextProducts: Product[]) => { created: number; updated: number };
  resetProducts: () => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

function isProductLike(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<Product>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.price === "number" &&
    typeof candidate.description === "string" &&
    typeof candidate.category === "string" &&
    Array.isArray(candidate.images)
  );
}

function loadProducts(): Product[] {
  if (typeof window === "undefined") {
    return seedProducts;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return seedProducts;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return seedProducts;
    }

    const valid = parsed.filter(isProductLike);
    return valid.length > 0 ? valid : seedProducts;
  } catch {
    return seedProducts;
  }
}

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => loadProducts());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const value = useMemo<ProductContextValue>(
    () => ({
      products,
      addOrUpdateProduct: (product) => {
        setProducts((current) => {
          const index = current.findIndex((p) => p.id === product.id);
          if (index === -1) {
            return [product, ...current];
          }

          const next = [...current];
          next[index] = product;
          return next;
        });
      },
      addOrUpdateMany: (nextProducts) => {
        let created = 0;
        let updated = 0;
        const map = new Map(products.map((item) => [item.id, item]));

        for (const product of nextProducts) {
          if (map.has(product.id)) {
            updated += 1;
          } else {
            created += 1;
          }
          map.set(product.id, product);
        }

        setProducts(Array.from(map.values()));

        return { created, updated };
      },
      resetProducts: () => setProducts(seedProducts),
    }),
    [products]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider.");
  }
  return context;
}
