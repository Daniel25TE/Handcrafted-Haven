"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./navbar.css";

interface CartItem {
  id: string;
  quantity: number;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    const totalCount = stored.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    updateCartCount();

    const handleCartUpdated = () => updateCartCount();

    window.addEventListener("cartUpdated", handleCartUpdated);
    window.addEventListener("storage", handleCartUpdated);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated);
      window.removeEventListener("storage", handleCartUpdated);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container container">
        <Link href="/" className="navbar-logo">
          <Image
            src="/handcrafted-haven-logo.png"
            alt="Handcrafted Haven logo"
            width={180}
            height={50}
            priority
          />
        </Link>

        <div className="navbar-actions">
          <Link
            href="/cart"
            className="navbar-cart mobile-cart"
            aria-label="View cart"
          >
            <span className="cart-icon-wrapper">
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </span>
          </Link>

          <button
            className="navbar-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/artisans" onClick={() => setMenuOpen(false)}>
            Artisans
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>

          <Link
            href="/cart"
            className="navbar-cart desktop-cart"
            aria-label="View cart"
            onClick={() => setMenuOpen(false)}
          >
            <span className="cart-icon-wrapper">
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </span>
          </Link>

          <Link
            href="/login"
            className="navbar-login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}