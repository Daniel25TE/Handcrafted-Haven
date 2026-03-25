import "./about.css";

export default function FeaturesSection() {
  return (
    <section className="about-features section">
      <div className="container">
        <div className="section-heading">
          <h2>What We Offer</h2>
          <p>
            Handcrafted Haven brings together useful features that make it easy
            for artisans to sell and for customers to explore handmade products.
          </p>
        </div>

        <div className="about-features-grid">
          <article className="feature-card">
            <h3>Seller Profiles</h3>
            <p>
              Authenticated sellers can build dedicated profiles to showcase
              their craftsmanship, tell their story, and highlight their work.
            </p>
          </article>

          <article className="feature-card">
            <h3>Product Listings</h3>
            <p>
              Artisans can list handcrafted items with images, prices,
              descriptions, and other details that help customers make informed
              choices.
            </p>
          </article>

          <article className="feature-card">
            <h3>Easy Browsing</h3>
            <p>
              Customers can explore the catalog and filter products by category,
              price range, and other relevant criteria.
            </p>
          </article>

          <article className="feature-card">
            <h3>Reviews and Ratings</h3>
            <p>
              Users can leave ratings and written reviews, helping build trust,
              engagement, and a stronger sense of community.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}