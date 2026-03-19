import "./featuredproducts.css";

const products = [
  {
    id: 1,
    name: "Handwoven Basket",
    price: "$28",
    description: "A carefully woven storage basket made from natural fibers.",
  },
  {
    id: 2,
    name: "Ceramic Mug",
    price: "$22",
    description: "A handmade mug with earthy tones and a rustic finish.",
  },
  {
    id: 3,
    name: "Knitted Scarf",
    price: "$35",
    description: "A soft and cozy scarf crafted with comfort and style in mind.",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="featured-products">
      <div className="featured-products-container">
        <p className="section-tag">Featured Collection</p>
        <h2>Handpicked Favorites</h2>
        <p className="section-text">
          Explore a few of the unique handcrafted items available in our
          marketplace.
        </p>

        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image-placeholder">
                <span>Product Image</span>
              </div>
              <h3>{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <p className="product-description">{product.description}</p>
              <button className="product-button">View Details</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}