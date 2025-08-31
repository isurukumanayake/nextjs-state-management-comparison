"use client";

import { useRenderLogger } from "@repo/ui/hooks/useRenderLogger";
import { ProductCard } from "@repo/ui/product-card";
import { useMemo } from "react";
import { useCartItems, useCartStore } from "../stores/cartStore";
import { useFilterStore } from "../stores/filterStore";

export function ProductGrid() {
  const filteredProducts = useFilterStore((state) => state.filteredProducts);
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartItems();

  // Memoize isItemInCart to prevent function recreation
  const isItemInCart = useMemo(() => {
    const cartItemIds = new Set(cartItems.map((item) => item.product.id));
    return (id: string) => cartItemIds.has(id);
  }, [cartItems]);

  useRenderLogger("ProductGrid", "🟡");

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
