"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/db/supabase-browser";
import "./navbar.css";

interface CartItem {
  id: string;
  quantity: number;
}

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  avatar_url: string | null;
  role: "buyer" | "artisan";
}

const supabase = createBrowserSupabaseClient();

export default function Navbar() {
  const router = useRouter();
  const mobileProfileMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopProfileMenuRef = useRef<HTMLDivElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const updateCartCount = () => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    const totalCount = stored.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setProfile(null);
    setProfileMenuOpen(false);
    setMenuOpen(false);
    router.refresh();
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

  useEffect(() => {
    const loadUserProfile = async () => {
      setLoadingUser(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        setLoadingUser(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, first_name, last_name, username, avatar_url, role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Failed to load profile:", error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoadingUser(false);
    };

    loadUserProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      setProfileMenuOpen(false);
      loadUserProfile();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const displayName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    profile?.username ||
    profile?.email ||
    "Account";

  const initial = (
    profile?.first_name?.charAt(0) ||
    profile?.username?.charAt(0) ||
    profile?.email?.charAt(0) ||
    "A"
  ).toUpperCase();

  const profileHref =
    profile?.role === "artisan" ? `/artisans/${profile.id}` : "/account";

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

          {!loadingUser && profile ? (
            <div
              className="navbar-profile-wrapper navbar-profile-wrapper-mobile"
              ref={mobileProfileMenuRef}
            >
              <button
                type="button"
                className="navbar-profile-button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                aria-label={displayName}
                title={displayName}
              >
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={displayName}
                    width={40}
                    height={40}
                    className="navbar-avatar-image"
                  />
                ) : (
                  <span className="navbar-avatar-fallback">{initial}</span>
                )}
              </button>

              {profileMenuOpen && (
                <div className="navbar-profile-dropdown">
                  <Link
                    href={profileHref}
                    className="navbar-profile-dropdown-item"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    View Profile
                  </Link>

                  <button
                    type="button"
                    className="navbar-profile-dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : !loadingUser ? (
            <Link
              href="/login"
              className="navbar-login navbar-login-mobile"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : null}

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

          {loadingUser ? null : profile ? (
            <div
              className="navbar-profile-wrapper navbar-profile-wrapper-desktop"
              ref={desktopProfileMenuRef}
            >
              <button
                type="button"
                className="navbar-profile-button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                aria-label={displayName}
                title={displayName}
              >
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={displayName}
                    width={40}
                    height={40}
                    className="navbar-avatar-image"
                  />
                ) : (
                  <span className="navbar-avatar-fallback">{initial}</span>
                )}
              </button>

              {profileMenuOpen && (
                <div className="navbar-profile-dropdown">
                  <Link
                    href={profileHref}
                    className="navbar-profile-dropdown-item"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    View Profile
                  </Link>

                  <button
                    type="button"
                    className="navbar-profile-dropdown-item logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="navbar-login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}