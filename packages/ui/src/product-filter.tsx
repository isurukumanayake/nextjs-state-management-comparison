import React from "react";
import { useRenderLogger } from "./hooks/useRenderLogger";
import { CATEGORIES } from "./mock-data";
import { FilterState } from "./types";

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  productCount: number;
  isLoading?: boolean;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  productCount,
  isLoading = false,
}) => {
  useRenderLogger("UI: ProductFilter", "🟣");

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      category: "all",
      minPrice: 0,
      maxPrice: 9999,
    });
  };

  return (
    <div className="ui:bg-white ui:p-6 ui:rounded-lg ui:shadow-md ui:mb-6 ui:w-full">
      <div className="ui:grid ui:grid-cols-1 ui:lg:grid-cols-4 ui:gap-4">
        {/* Search */}
        <div className="ui:w-full">
          <div className="ui:text-sm ui:font-medium ui:text-gray-700 ui:mb-1">
            Search Products
          </div>
          <input
            id="search"
            type="text"
            placeholder="Search by name or description..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="ui:w-full ui:px-4 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md"
          />
        </div>

        {/* Category Filter */}
        <div className="ui:w-full ui:flex-1">
          <div className="ui:text-sm ui:font-medium ui:text-gray-700 ui:mb-1">
            Category
          </div>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="ui:px-4 ui:py-2 ui:border ui:w-full ui:border-gray-300 ui:rounded-md ui:bg-white ui:min-w-32"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category === "all"
                  ? "All Categories"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="ui:w-full">
          <div className="ui:text-sm ui:font-medium ui:text-gray-700">
            Price:
          </div>
          <div className="ui:flex ui:items-center ui:gap-2 ui:w-full">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                updateFilter("minPrice", parseInt(e.target.value) || 0)
              }
              className="ui:px-2 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md ui:w-full"
            />
            <span className="ui:text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice === 9999 ? "" : filters.maxPrice}
              onChange={(e) =>
                updateFilter("maxPrice", parseInt(e.target.value) || 9999)
              }
              className="ui:px-2 ui:py-2 ui:border ui:border-gray-300 ui:rounded-md ui:w-full"
            />
          </div>
        </div>

        <div className="ui:w-full ui:flex ui:justify-end">
          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="ui:px-4 ui:py-2 ui:h-10 ui:bg-red-400 ui:text-white ui:rounded-md ui:text-sm ui:font-medium ui:place-self-end"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="ui:mt-4 ui:flex ui:justify-between ui:items-center ui:text-sm">
        <span className="ui:text-gray-600">
          {isLoading ? (
            <span className="ui:flex ui:items-center ui:gap-2">
              <div className="ui:w-4 ui:h-4 ui:border-2 ui:border-blue-600 ui:border-t-transparent ui:rounded-full ui:animate-spin" />
              Filtering...
            </span>
          ) : (
            `Showing ${productCount} products`
          )}
        </span>

        {(filters.search ||
          filters.category !== "all" ||
          filters.minPrice > 0 ||
          filters.maxPrice < 9999) && (
          <span className="ui:text-blue-600 ui:text-xs">Filters applied</span>
        )}
      </div>
    </div>
  );
};
