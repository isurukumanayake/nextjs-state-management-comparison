import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: 'MacBook Pro 16"',
    price: 2499,
    category: "laptops",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
    stock: 12,
    description: "Powerful laptop for professionals",
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    price: 999,
    category: "phones",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    stock: 25,
    description: "Latest iPhone with titanium design",
  },
  {
    id: "3",
    name: "AirPods Pro",
    price: 249,
    category: "audio",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=200&fit=crop",
    stock: 18,
    description: "Wireless earbuds with ANC",
  },
  {
    id: "4",
    name: "iPad Air",
    price: 599,
    category: "tablets",
    image:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=200&fit=crop",
    stock: 8,
    description: "Versatile tablet for work and play",
  },
  {
    id: "5",
    name: "Apple Watch Ultra",
    price: 799,
    category: "wearables",
    image:
      "https://images.unsplash.com/photo-1579586337278-3f436f25d4d4?w=300&h=200&fit=crop",
    stock: 15,
    description: "Rugged smartwatch for adventures",
  },
  {
    id: "6",
    name: "Samsung Galaxy S24",
    price: 899,
    category: "phones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    stock: 22,
    description: "Android flagship with AI features",
  },
  {
    id: "7",
    name: "Dell XPS 13",
    price: 1299,
    category: "laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
    stock: 14,
    description: "Ultrabook with premium design",
  },
  {
    id: "8",
    name: "Sony WH-1000XM5",
    price: 399,
    category: "audio",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=200&fit=crop",
    stock: 20,
    description: "Industry-leading noise cancellation",
  },
  {
    id: "9",
    name: "Google Pixel 8",
    price: 699,
    category: "phones",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop",
    stock: 16,
    description: "Pure Android with AI photography",
  },
  {
    id: "10",
    name: "Surface Pro 9",
    price: 1099,
    category: "tablets",
    image:
      "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=300&h=200&fit=crop",
    stock: 11,
    description: "2-in-1 laptop and tablet",
  },
  // Add more products for better demo
  {
    id: "11",
    name: "ThinkPad X1 Carbon",
    price: 1599,
    category: "laptops",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop",
    stock: 9,
    description: "Business ultrabook with durability",
  },
  {
    id: "12",
    name: "Marshall Acton III",
    price: 279,
    category: "audio",
    image:
      "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=300&h=200&fit=crop",
    stock: 13,
    description: "Vintage-style Bluetooth speaker",
  },
  {
    id: "13",
    name: "Fitbit Versa 4",
    price: 199,
    category: "wearables",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
    stock: 24,
    description: "Health and fitness smartwatch",
  },
  {
    id: "14",
    name: "OnePlus 12",
    price: 799,
    category: "phones",
    image:
      "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=300&h=200&fit=crop",
    stock: 17,
    description: "Flagship killer with fast charging",
  },
  {
    id: "15",
    name: 'iPad Pro 12.9"',
    price: 1099,
    category: "tablets",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
    stock: 7,
    description: "Professional tablet with M2 chip",
  },
];

export const CATEGORIES = [
  "all",
  "laptops",
  "phones",
  "tablets",
  "audio",
  "wearables",
];
