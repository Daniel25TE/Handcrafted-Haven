import Link from "next/link";
import "./ctasection.css";

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <p className="cta-tag">Join the Community</p>
        <h2>Support Handmade. Share Creativity. Shop with Purpose.</h2>
        <p className="cta-text">
          Whether you are looking for one-of-a-kind handcrafted goods or want
          to showcase your own creations, Handcrafted Haven is the place to
          connect, discover, and grow.
        </p>

        <div className="cta-buttons">
          <Link href="/shop" className="cta-button primary">
            Start Shopping
          </Link>
          <Link href="/signup" className="cta-button secondary">
            Become a Seller
          </Link>
        </div>
      </div>
    </section>
  );
}