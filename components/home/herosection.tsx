import Link from "next/link";
import "./herosection.css";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">Handmade with heart</p>
        <h1>Discover Unique Creations from Local Artisans</h1>
        <p className="hero-text">
          Handcrafted Haven connects talented makers with people who value
          creativity, quality, and sustainable shopping. Explore one-of-a-kind
          pieces made with passion and care.
        </p>

        <div className="hero-buttons">
          <Link href="/shop" className="hero-btn primary">
            Shop Now
          </Link>
          <Link href="/artisans" className="hero-btn secondary">
            Meet the Artisans
          </Link>
        </div>
      </div>
    </section>
  );
}