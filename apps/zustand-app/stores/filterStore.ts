import { PRODUCTS } from "@repo/ui/mock-data";
import { FilterState, Product } from "@repo/ui/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface FilterStore {
  filters: FilterState;
  filteredProducts: Product[];
  isLoading: boolean;

  setFilters: (filters: FilterState) => void;
  updateFilter: (key: keyof FilterState, value: string | number) => void;
  clearFilters: () => void;
}

const filterProducts = (filters: FilterState): Product[] => {
  console.log("🟢 Zustand: Filtering products...");

  return PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory =
      filters.category === "all" || product.category === filters.category;
    const matchesPrice =
      product.price >= filters.minPrice &&
      (filters.maxPrice === 9999 || product.price <= filters.maxPrice);

    return matchesSearch && matchesCategory && matchesPrice;
  });
};

const initialFilters: FilterState = {
  search: "",
  category: "all",
  minPrice: 0,
  maxPrice: 9999,
};

export const useFilterStore = create<FilterStore>()(
  devtools(
    immer((set, get) => ({
      filters: initialFilters,
      filteredProducts: PRODUCTS, // Initialize with all products
      isLoading: false,

      setFilters: (filters: FilterState) => {
        set((state) => {
          state.filters = filters;
          state.filteredProducts = filterProducts(filters);
        });
      },

      updateFilter: (key: keyof FilterState, value: string | number) => {
        set((state) => {
          if (key === "search" || key === "category") {
            state.filters[key] = value as string;
          } else if (key === "minPrice" || key === "maxPrice") {
            state.filters[key] = value as number;
          }
          // Recalculate filtered products when filters change
          state.filteredProducts = filterProducts(state.filters);
        });
      },

      clearFilters: () => {
        set((state) => {
          state.filters = initialFilters;
          state.filteredProducts = PRODUCTS;
        });
      },
    })),
    { name: "filter-store" }
  )
);
