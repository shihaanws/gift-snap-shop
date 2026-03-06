import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "gift-snap-shop-cart";

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  variant?: string;
}

interface AddToCartInput {
  productId: string;
  quantity?: number;
  variant?: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (input: AddToCartInput) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readInitialCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    const valid = parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.productId === "string" &&
        typeof item.quantity === "number"
    );
    const merged = new Map<string, CartItem>();
    for (const item of valid) {
      const existing = merged.get(item.productId);
      if (existing) {
        existing.quantity += item.quantity;
        if (item.variant) {
          existing.variant = item.variant;
        }
      } else {
        merged.set(item.productId, {
          id: item.productId,
          productId: item.productId,
          quantity: Math.max(1, item.quantity),
          variant: item.variant,
        });
      }
    }
    return Array.from(merged.values());
  } catch {
    return [];
  }
}

function getItemId(productId: string, variant?: string) {
  return productId;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => readInitialCart());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      addItem: ({ productId, quantity = 1, variant }) => {
        const nextQty = Math.max(1, quantity);
        const id = getItemId(productId, variant);
        setItems((current) => {
          const existing = current.find((item) => item.productId === productId);
          if (!existing) {
            return [...current, { id, productId, quantity: nextQty, variant }];
          }
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + nextQty, variant: variant ?? item.variant }
              : item
          );
        });
      },
      updateQuantity: (itemId, quantity) => {
        setItems((current) =>
          current.map((item) =>
            item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        );
      },
      removeItem: (itemId) => {
        setItems((current) => current.filter((item) => item.id !== itemId));
      },
      clearCart: () => setItems([]),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }
  return context;
}
