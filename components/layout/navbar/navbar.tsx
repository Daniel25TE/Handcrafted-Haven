"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/navbar/navbar.constants";
import { useCartCount } from "@/lib/navbar/use-cart-count";
import { useNavbarAuth } from "@/lib/navbar/use-navbar-auth";
import NavbarProfileMenu from "./navbar-profile-menu";
import "./navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  const mobileProfileMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopProfileMenuRef = useRef<HTMLDivElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const cartCount = useCartCount();

  const closeAllMenus = () => {
    setProfileMenuOpen(false);
    setMenuOpen(false);
  };

  const { profile, loadingUser, handleLogout } = useNavbarAuth(closeAllMenus);

  useEffect(() => {
    closeAllMenus();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideMobile =
        mobileProfileMenuRef.current?.contains(target) ?? false;

      const clickedInsideDesktop =
        desktopProfileMenuRef.current?.contains(target) ?? false;

      if (!clickedInsideMobile && !clickedInsideDesktop) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAdmin = profile?.role === "admin";

  const visibleNavLinks = loadingUser
    ? []
    : isAdmin
    ? NAV_LINKS.filter((link) => link.href !== "/contact")
    : NAV_LINKS;

  return (
    <header className="navbar">
      <div className="navbar-container container">
        <Link href="/" className="navbar-logo" onClick={closeAllMenus}>
          <Image
            src="/handcrafted-haven-logo.png"
            alt="Handcrafted Haven logo"
            width={180}
            height={50}
            priority
          />
        </Link>

        <div className="navbar-actions">
          {!loadingUser && !isAdmin && (
            <Link
              href="/cart"
              className="navbar-cart mobile-cart"
              aria-label="View cart"
              onClick={closeAllMenus}
            >
              <span className="cart-icon-wrapper">
                <span className="cart-icon">🛒</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </span>
            </Link>
          )}

          {!loadingUser && profile ? (
            <div ref={mobileProfileMenuRef}>
              <NavbarProfileMenu
                profile={profile}
                isOpen={profileMenuOpen}
                onToggle={() => setProfileMenuOpen((prev) => !prev)}
                onClose={closeAllMenus}
                onLogout={handleLogout}
                className="navbar-profile-wrapper-mobile"
              />
            </div>
          ) : !loadingUser ? (
            <Link
              href="/login"
              className="navbar-login navbar-login-mobile"
              onClick={closeAllMenus}
            >
              Login
            </Link>
          ) : null}

          <button
            className="navbar-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>

        <nav className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          {visibleNavLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeAllMenus}>
              {link.label}
            </Link>
          ))}

          {!loadingUser && !isAdmin && (
            <Link
              href="/cart"
              className="navbar-cart desktop-cart"
              aria-label="View cart"
              onClick={closeAllMenus}
            >
              <span className="cart-icon-wrapper">
                <span className="cart-icon">🛒</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </span>
            </Link>
          )}

          {loadingUser ? null : profile ? (
            <div ref={desktopProfileMenuRef}>
              <NavbarProfileMenu
                profile={profile}
                isOpen={profileMenuOpen}
                onToggle={() => setProfileMenuOpen((prev) => !prev)}
                onClose={closeAllMenus}
                onLogout={handleLogout}
                className="navbar-profile-wrapper-desktop"
              />
            </div>
          ) : (
            <Link href="/login" className="navbar-login" onClick={closeAllMenus}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}