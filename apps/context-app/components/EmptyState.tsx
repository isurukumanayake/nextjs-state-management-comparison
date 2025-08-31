"use client";

import { useRenderLogger } from "@repo/ui/hooks/useRenderLogger";
import { useFilters } from "../contexts/FilterContext";

export function EmptyState() {
  const { filteredProducts, isLoading } = useFilters();

  useRenderLogger("Context API: EmptyState", "🟡");

  if (filteredProducts.length > 0 || isLoading) return null;

  return (
    <div className="text-center py-12">
      <svg
        className="w-16 h-16 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-500">Try adjusting your filters.</p>
    </div>
  );
}
