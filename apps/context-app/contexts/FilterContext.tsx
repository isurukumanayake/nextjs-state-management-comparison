"use client";

import { PRODUCTS } from "@repo/ui/mock-data";
import { FilterState, Product } from "@repo/ui/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  updateFilter: (key: keyof FilterState, value: string | number) => void;
  filteredProducts: Product[];
  isLoading: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 9999,
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    setIsLoading(true);
    // Simulate filtering delay
    setTimeout(() => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setIsLoading(false);
    }, 100);
  };

  const filteredProducts = useMemo(() => {
    console.log("🟢 Context: Recalculating filtered products...");

    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === "all" || product.category === filters.category;
      const matchesPrice =
        product.price >= filters.minPrice &&
        (filters.maxPrice === 9999 || product.price <= filters.maxPrice);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [filters]);

  const contextValue = {
    filters,
    setFilters,
    updateFilter,
    filteredProducts,
    isLoading,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
};
