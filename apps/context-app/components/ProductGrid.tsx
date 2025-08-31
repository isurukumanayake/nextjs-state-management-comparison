"use client";

import { useRenderLogger } from "@repo/ui/hooks/useRenderLogger";
import { ProductCard } from "@repo/ui/product-card";
import { useCart } from "../contexts/CartContext";
import { useFilters } from "../contexts/FilterContext";

export function ProductGrid() {
  const { filteredProducts } = useFilters();
  const { addItem, isItemInCart } = useCart();

  useRenderLogger("Context API: ProductGrid", "🟡");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addItem}
          isInCart={isItemInCart(product.id)}
        />
      ))}
    </div>
  );
}
