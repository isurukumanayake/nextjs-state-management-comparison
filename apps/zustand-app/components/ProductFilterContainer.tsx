"use client";

import { useRenderLogger } from "@repo/ui/hooks/useRenderLogger";
import { ProductFilter } from "@repo/ui/product-filter";
import { useFilterStore } from "../stores/filterStore";

export function ProductFilterContainer() {
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);
  const filteredProducts = useFilterStore((state) => state.filteredProducts);

  useRenderLogger("ProductFilterContainer", "🟡");

  return (
    <ProductFilter
      filters={filters}
      onFilterChange={setFilters}
      productCount={filteredProducts.length}
    />
  );
}
