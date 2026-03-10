import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as seedProducts } from "@/data/products";
import type { Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

interface ProductContextValue {
  products: Product[];
  addOrUpdateProduct: (product: Product) => Promise<void>;
  addOrUpdateMany: (nextProducts: Product[]) => Promise<{ created: number; updated: number }>;
  removeProduct: (productId: string) => Promise<void>;
  resetProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextValue | null>(null);

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.map((item) => String(item));
}
function toPublicImageUrl(path: string): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl ?? path;
}
function mapRowToProduct(row: ProductRow): Product {
  return (
    {
      id: row.id,
      name: row.name,
      price: Number(row.price),
      description: row.description,
      category: row.category,
      images: asStringArray(row.images).map(toPublicImageUrl),
      variants: row.variants ? asStringArray(row.variants) : undefined,
      bundleSize: row.bundle_size ?? undefined,
      currency: row.currency === "USD" ? "USD" : "INR",
      gstRate: row.gst_rate ?? undefined,
      listPrice: row.list_price ?? undefined,
      discountPercent: row.discount_percent ?? undefined,
      availableColors: row.available_colors ? asStringArray(row.available_colors) : undefined,
      productCode: row.product_code ?? undefined,
      material: row.material ?? undefined,
      packingType: row.packing_type ?? undefined,
      masterCarton: row.master_carton ?? undefined,
      customized: row.customized ?? undefined,
      minOrderQty: row.min_order_qty ?? undefined,
    }
  );
}

function mapProductToInsert(product: Product): ProductInsert {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    images: product.images,
    variants: product.variants ?? null,
    bundle_size: product.bundleSize ?? null,
    currency: product.currency ?? "INR",
    gst_rate: product.gstRate ?? null,
    list_price: product.listPrice ?? null,
    discount_percent: product.discountPercent ?? null,
    available_colors: product.availableColors ?? null,
    product_code: product.productCode ?? null,
    material: product.material ?? null,
    packing_type: product.packingType ?? null,
    master_carton: product.masterCarton ?? null,
    customized: product.customized ?? null,
    min_order_qty: product.minOrderQty ?? null,
  };
}

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch products from Supabase", error);
        return;
      }

      if (!isMounted) {
        return;
      }

      const rows = data ?? [];
      setProducts(rows.map(mapRowToProduct));
    };

    void fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<ProductContextValue>(
    () => ({
      products,
      addOrUpdateProduct: async (product) => {
        const row = mapProductToInsert(product);
        const { error } = await supabase.from("products").upsert(row, { onConflict: "id" });
        if (error) {
          throw error;
        }
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
      addOrUpdateMany: async (nextProducts) => {
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

        const rows = nextProducts.map(mapProductToInsert);
        const { error } = await supabase.from("products").upsert(rows, { onConflict: "id" });
        if (error) {
          throw error;
        }

        setProducts(Array.from(map.values()));

        return { created, updated };
      },
      removeProduct: async (productId) => {
        const { error } = await supabase.from("products").delete().eq("id", productId);
        if (error) {
          throw error;
        }
        setProducts((current) => current.filter((item) => item.id !== productId));
      },
      resetProducts: async () => {
        const { error: deleteError } = await supabase.from("products").delete().neq("id", "");
        if (deleteError) {
          throw deleteError;
        }
        const seedRows = seedProducts.map(mapProductToInsert);
        const { error: insertError } = await supabase.from("products").insert(seedRows);
        if (insertError) {
          throw insertError;
        }
        setProducts(seedProducts);
      },
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
