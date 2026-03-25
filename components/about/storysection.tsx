export default function StorySection() {
  return (
    <section className="about-story section">
      <div className="container">
        <div className="section-heading">
          <h2>Who We Are</h2>
          <p>
            Handcrafted Haven was created to give artisans and crafters a
            dedicated online space where their work can be discovered,
            appreciated, and supported by a wider audience.
          </p>
        </div>

        <div className="about-story-grid">
          <div className="about-story-card">
            <h3>For Artisans</h3>
            <p>
              We provide a platform where makers can showcase their
              craftsmanship, share their personal stories, and present a curated
              collection of handcrafted goods.
            </p>
          </div>

          <div className="about-story-card">
            <h3>For Shoppers</h3>
            <p>
              We help customers discover original products made with care,
              creativity, and authenticity—items that stand apart from
              mass-produced alternatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}