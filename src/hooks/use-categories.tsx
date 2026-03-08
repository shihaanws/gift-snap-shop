import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { categories as seedCategories } from "@/data/products";
import type { Category } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];

interface CategoryContextValue {
  categories: Category[];
  addOrUpdateCategory: (category: Category) => Promise<void>;
  removeCategory: (categoryId: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextValue | null>(null);

function mapRowToCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    image: row.image,
  };
}

function mapCategoryToInsert(category: Category): CategoryInsert {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    image: category.image,
  };
}

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>(seedCategories);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true });
      if (error) {
        console.error("Failed to fetch categories from Supabase", error);
        return;
      }

      if (!isMounted) {
        return;
      }

      if (!data || data.length === 0) {
        const seedRows = seedCategories.map(mapCategoryToInsert);
        const { error: seedError } = await supabase.from("categories").upsert(seedRows, { onConflict: "id" });
        if (seedError) {
          console.error("Failed to seed categories in Supabase", seedError);
          setCategories(seedCategories);
          return;
        }
        setCategories(seedCategories);
        return;
      }

      setCategories(data.map(mapRowToCategory));
    };

    void fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<CategoryContextValue>(
    () => ({
      categories,
      addOrUpdateCategory: async (category) => {
        const row = mapCategoryToInsert(category);
        const { error } = await supabase.from("categories").upsert(row, { onConflict: "id" });
        if (error) {
          throw error;
        }
        setCategories((current) => {
          const index = current.findIndex((item) => item.id === category.id);
          if (index === -1) {
            return [...current, category].sort((a, b) => a.name.localeCompare(b.name));
          }
          const next = [...current];
          next[index] = category;
          return next.sort((a, b) => a.name.localeCompare(b.name));
        });
      },
      removeCategory: async (categoryId) => {
        const { error } = await supabase.from("categories").delete().eq("id", categoryId);
        if (error) {
          throw error;
        }
        setCategories((current) => current.filter((item) => item.id !== categoryId));
      },
    }),
    [categories]
  );

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoryProvider.");
  }
  return context;
}
