import { CartItem, CartState, Product } from "@repo/ui/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface CartStore extends CartState {
  _hasHydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isItemInCart: (id: string) => boolean;
}

const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        items: [],
        total: 0,
        itemCount: 0,
        _hasHydrated: false,

        addItem: (product: Product, quantity: number = 1) => {
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.product.id === product.id
            );

            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              state.items.push({ product, quantity });
            }

            const totals = calculateTotals(state.items);
            state.total = totals.total;
            state.itemCount = totals.itemCount;
          });
        },

        removeItem: (id: string) => {
          set((state) => {
            state.items = state.items.filter((item) => item.product.id !== id);
            const totals = calculateTotals(state.items);
            state.total = totals.total;
            state.itemCount = totals.itemCount;
          });
        },

        updateQuantity: (id: string, quantity: number) => {
          if (quantity <= 0) {
            get().removeItem(id);
            return;
          }

          set((state) => {
            const item = state.items.find((item) => item.product.id === id);
            if (item) {
              item.quantity = quantity;
              const totals = calculateTotals(state.items);
              state.total = totals.total;
              state.itemCount = totals.itemCount;
            }
          });
        },

        clearCart: () => {
          set((state) => {
            state.items = [];
            state.total = 0;
            state.itemCount = 0;
          });
        },

        isItemInCart: (id: string) => {
          const state = get();
          if (!state._hasHydrated) return false;
          return state.items.some((item) => item.product.id === id);
        },
      })),
      {
        name: "zustand-cart",
        onRehydrateStorage: () => (state) => {
          console.log("🟢 Zustand: Cart rehydration completed");
          if (state) {
            state._hasHydrated = true;
          }
        },
      }
    ),
    { name: "cart-store" }
  )
);

// Create SSR-safe selectors
export const useCartItemCount = () => {
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const itemCount = useCartStore((state) => state.itemCount);
  return hasHydrated ? itemCount : 0;
};

export const useCartItems = () => {
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const items = useCartStore((state) => state.items);
  return hasHydrated ? items : [];
};
