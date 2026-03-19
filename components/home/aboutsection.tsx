import "./aboutsection.css";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <p className="about-tag">About Handcrafted Haven</p>
          <h2>A Marketplace Built for Creativity and Community</h2>
          <p className="about-text">
            Handcrafted Haven is a digital space where artisans can share their
            stories, showcase their craftsmanship, and connect with customers
            who value meaningful handmade products.
          </p>
          <p className="about-text">
            Our goal is to support local makers, encourage sustainable
            shopping, and create a welcoming community where creativity and
            quality are celebrated.
          </p>
        </div>

        <div className="about-highlight">
          <div className="highlight-box">
            <h3>Why It Matters</h3>
            <p>
              Every handmade item carries the story, care, and individuality of
              the artisan who created it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}