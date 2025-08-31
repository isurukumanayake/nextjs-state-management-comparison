import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@repo/ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zustand Demo - State Management Comparison",
  description: "Demonstrating Zustand for optimal state management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
