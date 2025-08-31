"use client";

import { useRenderLogger } from "@repo/ui/hooks/useRenderLogger";
import { ProductFilter } from "@repo/ui/product-filter";
import { useFilters } from "../contexts/FilterContext";

export function ProductFilterContainer() {
  const { filters, setFilters, filteredProducts, isLoading } = useFilters();

  useRenderLogger("Context API: ProductFilterContainer", "🟡");

  return (
    <ProductFilter
      filters={filters}
      onFilterChange={setFilters}
      productCount={filteredProducts.length}
      isLoading={isLoading}
    />
  );
}
