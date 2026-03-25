import Link from "next/link";
import "./about.css";

export default function AboutCTASection() {
  return (
    <section className="about-cta section">
      <div className="container about-cta-content">
        <h2>Join the Handcrafted Haven Community</h2>
        <p>
          Whether you are an artisan ready to share your creations or a shopper
          searching for meaningful handmade items, Handcrafted Haven welcomes
          you.
        </p>

        <div className="about-cta-actions">
        <Link href="/shop" className="btn about-cta-primary">
            Explore Products
        </Link>
        <Link href="/artisans" className="btn about-cta-light">
            Meet Our Artisans
        </Link>
        </div>
      </div>
    </section>
  );
}