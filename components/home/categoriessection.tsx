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
  return (
    <section className="categories-section">
      <div className="categories-container">
        <p className="categories-tag">Shop by Category</p>
        <h2>Browse Handmade Collections</h2>
        <p className="categories-text">
          Discover curated categories filled with unique products made by
          talented artisans.
        </p>

        <div className="categories-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card">
              <h3>{category.title}</h3>
              <p>{category.text}</p>
              <button className="category-button">Explore</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}