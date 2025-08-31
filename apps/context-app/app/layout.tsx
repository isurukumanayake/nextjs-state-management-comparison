import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "../contexts/CartContext";
import { FilterProvider } from "../contexts/FilterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Context API Demo - State Management Comparison",
  description: "Demonstrating React Context API for state management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Notice the provider nesting - this can get complex! */}
        <CartProvider>
          <FilterProvider>
            <div className="min-h-screen bg-gray-50">{children}</div>
          </FilterProvider>
        </CartProvider>
      </body>
    </html>
  );
}
