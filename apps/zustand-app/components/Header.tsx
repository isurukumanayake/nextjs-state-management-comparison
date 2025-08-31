"use client";

import { CartSidebar } from "@repo/ui/cart-sidebar";
import { useRenderLogger } from "@repo/ui/hooks/useRenderLogger";
import { useState } from "react";
import { useCartStore } from "../stores/cartStore";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const itemCount = useCartStore((state) => state.itemCount);
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);

  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  useRenderLogger("Zustand: Header", "🟡");

  return (
    <>
      <header className="bg-white shadow-sm border-b border-b-gray-300 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Zustand Demo</h1>
              <p className="text-xs text-red-400">
                (Watch console for re-render logs)
              </p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 p-1 min-w-5 min-h-5 text-white text-xs rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartSidebar
        cart={{ items, total, itemCount }}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />
    </>
  );
}
