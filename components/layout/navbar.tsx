"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

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