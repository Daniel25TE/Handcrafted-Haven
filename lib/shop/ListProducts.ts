export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Handwoven Basket",
    description: "A carefully woven storage basket made from natural fibers.",
    price: 28,
    category: "Home",
    images: ["/placeholders/basket.jpg"],
    rating: 8.5,
  },
  {
    id: "p2",
    name: "Ceramic Mug",
    description: "A handmade mug with earthy tones and a rustic finish.",
    price: 22,
    category: "Kitchen",
    images: ["/placeholders/mug.jpg"],
    rating: 9.2,
  },
  {
    id: "p3",
    name: "Knitted Scarf",
    description: "A soft and cozy scarf crafted with comfort and style.",
    price: 35,
    category: "Clothing",
    images: ["/placeholders/scarf.jpg"],
    rating: 8.9,
  },
  {
    id: "p4",
    name: "Wooden Spoon Set",
    description: "Hand-carved wooden spoons perfect for cooking.",
    price: 18,
    category: "Kitchen",
    images: ["/placeholders/spoon.jpg"],
    rating: 8.3,
  },
];