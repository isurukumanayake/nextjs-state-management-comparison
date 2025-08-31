import React, { useState } from "react";
import { useRenderLogger } from "./hooks/useRenderLogger";
import { Product } from "./types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isInCart = false,
}) => {
  useRenderLogger("UI: ProductCard", "🟣");

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  return (
    <div className="ui:bg-white ui:rounded-lg ui:shadow-md ui:overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="ui:w-full ui:h-48 ui:object-cover"
      />

      <div className="ui:p-4">
        <span className="ui:font-semibold ui:text-lg ui:mb-2 ui:text-gray-900">
          {product.name}
        </span>
        <p className="ui:text-gray-600 ui:text-sm ui:mb-2 ui:line-clamp-2">
          {product.description}
        </p>

        <div className="ui:flex ui:justify-between ui:items-center ui:mb-3">
          <span className="ui:text-2xl ui:font-bold ui:text-blue-600">
            ${product.price.toLocaleString()}
          </span>
          <span
            className={`ui:text-sm ui:px-2 ui:py-1 ui:rounded ${
              product.stock > 10
                ? "ui:bg-green-100 ui:text-green-700"
                : product.stock > 0
                  ? "ui:bg-yellow-100 ui:text-yellow-700"
                  : "ui:bg-red-100 ui:text-red-700"
            }`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Quantity Controls */}
        {product.stock > 0 && (
          <div className="ui:flex ui:items-center ui:justify-between ui:mb-3 ui:p-2 ui:bg-gray-50 ui:rounded-lg">
            <span className="ui:text-sm ui:font-medium ui:text-gray-700">
              Quantity:
            </span>
            <div className="ui:flex ui:items-center ui:gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="ui:w-8 ui:h-8 ui:flex ui:items-center ui:justify-center ui:bg-white ui:border ui:border-gray-300 ui:rounded-md hover:ui:bg-gray-100 disabled:ui:opacity-50 disabled:ui:cursor-not-allowed ui:transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <div>{quantity}</div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="ui:w-8 ui:h-8 ui:flex ui:items-center ui:justify-center ui:bg-white ui:border ui:border-gray-300 ui:rounded-md hover:ui:bg-gray-100 disabled:ui:opacity-50 disabled:ui:cursor-not-allowed ui:transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Total Price Display */}
        {product.stock > 0 && quantity > 1 && (
          <div className="ui:mb-3 ui:text-center">
            <span className="ui:text-sm ui:text-gray-600">
              Total:{" "}
              <span className="ui:font-bold ui:text-blue-600">
                ${(product.price * quantity).toLocaleString()}
              </span>
            </span>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`ui:w-full ui:py-2 ui:px-4 text-white ui:rounded-md ui:bg-gray-600 ui:font-medium ui:transition-all ui:duration-200 ${
            product.stock === 0 ? "" : isInCart ? "" : ""
          }`}
        >
          {product.stock === 0
            ? "Out of Stock"
            : isInCart
              ? "✓ Added to Cart"
              : `Add ${quantity > 1 ? `${quantity} ` : ""}to Cart`}
        </button>
      </div>
    </div>
  );
};
