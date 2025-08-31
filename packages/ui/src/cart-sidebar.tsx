import { useRenderLogger } from "./hooks/useRenderLogger";
import { CartItem, CartState } from "./types";

interface CartSidebarProps {
  cart: CartState;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartSidebar({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) {
  useRenderLogger("UI: CartSidebar", "🟣");

  if (!isOpen) return null;

  return (
    <div className="ui:fixed ui:inset-0 ui:z-50 ui:overflow-hidden">
      {/* Backdrop */}
      <div
        className="ui:absolute ui:inset-0 ui:bg-black/20 ui:bg-opacity-50 ui:transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="ui:absolute ui:right-0 ui:top-0 ui:h-full ui:w-full ui:sm:w-96 ui:bg-white ui:shadow-xl ui:transform ui:transition-transform ui:duration-1000">
        <div className="ui:flex ui:flex-col ui:h-full">
          {/* Header */}
          <div className="ui:flex ui:items-center ui:justify-between ui:p-4 ui:border-b ui:bg-gray-50">
            <div>
              <h2 className="ui:text-lg ui:font-semibold ui:text-gray-900">
                Shopping Cart
              </h2>
              <p className="ui:text-sm ui:text-gray-600">
                {cart.itemCount} items
              </p>
            </div>
            <button
              onClick={onClose}
              className="ui:text-gray-500 hover:ui:text-gray-700 ui:p-2 ui:rounded-md hover:ui:bg-gray-200 ui:transition-colors"
            >
              <svg
                className="ui:w-5 ui:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="ui:flex-1 ui:overflow-y-auto ui:p-4">
            {cart.items.length === 0 ? (
              <div className="ui:text-center ui:py-12">
                <svg
                  className="ui:w-16 ui:h-16 ui:text-gray-400 ui:mx-auto ui:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="ui:text-gray-500 ui:mb-2">Your cart is empty</p>
                <p className="ui:text-sm ui:text-gray-400">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="ui:space-y-4">
                {cart.items.map((item: CartItem) => (
                  <div
                    key={item.product.id}
                    className="ui:flex ui:items-center ui:gap-3 ui:p-3 ui:border ui:rounded-lg hover:ui:bg-gray-50 ui:transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="ui:w-16 ui:h-16 ui:object-cover ui:rounded ui:flex-shrink-0"
                    />
                    <div className="ui:flex-1 ui:min-w-0">
                      <h3 className="ui:font-medium ui:text-gray-900 ui:truncate">
                        {item.product.name}
                      </h3>
                      <p className="ui:text-sm ui:text-gray-600">
                        ${item.product.price.toLocaleString()}
                      </p>
                      <div className="ui:flex ui:items-center ui:gap-2 ui:mt-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="ui:w-7 ui:h-7 ui:flex ui:items-center ui:justify-center ui:bg-gray-200 hover:ui:bg-gray-300 ui:rounded ui:text-sm ui:font-medium ui:transition-colors"
                        >
                          −
                        </button>
                        <span className="ui:w-8 ui:text-center ui:font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="ui:w-7 ui:h-7 ui:flex ui:items-center ui:justify-center ui:bg-gray-200 hover:ui:bg-gray-300 ui:rounded ui:text-sm ui:font-medium ui:transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="ui:ml-2 ui:text-red-500 hover:ui:text-red-700 ui:text-sm ui:font-medium ui:transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="ui:text-right">
                      <p className="ui:font-medium ui:text-gray-900">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="ui:border-t ui:p-4 ui:bg-gray-50">
              <div className="ui:flex ui:justify-between ui:items-center ui:mb-4">
                <span className="ui:text-lg ui:font-semibold ui:text-gray-900">
                  Total: ${cart.total.toLocaleString()}
                </span>
                <button
                  onClick={onClearCart}
                  className="ui:text-sm ui:text-red-600 hover:ui:text-red-700 ui:font-medium"
                >
                  Clear Cart
                </button>
              </div>
              <button className="ui:w-full ui:bg-blue-600 ui:text-white ui:py-3 ui:rounded-md hover:ui:bg-blue-700 ui:transition-colors ui:font-medium">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
