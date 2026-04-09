"use client";

import Link from "next/link";
import Image from "next/image";
import type { Profile } from "@/lib/navbar/navbar.types";

type NavbarProfileMenuProps = {
  profile: Profile;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogout: () => void;
  className?: string;
};

export default function NavbarProfileMenu({
  profile,
  isOpen,
  onToggle,
  onClose,
  onLogout,
  className = "",
}: NavbarProfileMenuProps) {
  const displayName =
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    profile.username ||
    profile.email ||
    "Account";

  const initial = (
    profile.first_name?.charAt(0) ||
    profile.username?.charAt(0) ||
    profile.email?.charAt(0) ||
    "A"
  ).toUpperCase();

  const isAdmin = profile.role === "admin";
  const profileHref = isAdmin ? "/admin" : "/account";
  const profileLabel = isAdmin ? "Admin Panel" : "View Profile";

  return (
    <div className={`navbar-profile-wrapper ${className}`}>
      <button
        type="button"
        className="navbar-profile-button"
        onClick={onToggle}
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

      {isOpen && (
        <div className="navbar-profile-dropdown">
          <Link
            href={profileHref}
            className="navbar-profile-dropdown-item"
            onClick={onClose}
          >
            {profileLabel}
          </Link>

          <button
            type="button"
            className="navbar-profile-dropdown-item logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}