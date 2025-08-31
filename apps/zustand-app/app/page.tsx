"use client";

import { useRenderLogger } from "@repo/ui/hooks/useRenderLogger";
import { EmptyState } from "../components/EmptyState";
import { Header } from "../components/Header";
import { ProductFilterContainer } from "../components/ProductFilterContainer";
import { ProductGrid } from "../components/ProductGrid";

export default function HomePage() {
  useRenderLogger("Zustand: HomePage (Parent)", "🟢");

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductFilterContainer />
        <ProductGrid />
        <EmptyState />
      </main>
    </div>
  );
}
