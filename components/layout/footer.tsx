import Link from "next/link";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-brand">
          <h3>Handcrafted Haven</h3>
          <p>
            A welcoming marketplace where artisans share handmade creations and
            shoppers discover meaningful, one-of-a-kind goods.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/artisans">Artisans</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/register">Sign Up</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Handcrafted Haven. All rights reserved.</p>
      </div>
    </footer>
  );
}