"use client";

import { useEffect, useRef, useState } from "react";
import "./categoriessection.css";

const categories = [
  {
    id: 1,
    title: "Home Decor",
    text: "Beautiful handmade pieces that bring warmth and character to every space.",
  },
  {
    id: 2,
    title: "Accessories",
    text: "Thoughtfully crafted wearable items designed for style, comfort, and individuality.",
  },
  {
    id: 3,
    title: "Kitchen & Dining",
    text: "Functional handcrafted goods that add charm to everyday meals and gatherings.",
  },
  {
    id: 4,
    title: "Gifts",
    text: "Meaningful handmade treasures perfect for celebrating special moments.",
  },
];

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCards(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="categories-section section">
      <div className="categories-container container">
        <p className="section-tag">Shop by Category</p>
        <h2>Browse Handmade Collections</h2>
        <p className="categories-text">
          Discover curated categories filled with unique products made by
          talented artisans.
        </p>

        <div className="categories-grid">
          {categories.map((category) => (
            <article
              key={category.id}
              className={`category-card card ${showCards ? "show" : ""}`}
            >
              <h3>{category.title}</h3>
              <p>{category.text}</p>
              <button className="btn btn-primary">Explore</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}