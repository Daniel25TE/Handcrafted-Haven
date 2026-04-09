"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/db/supabase-browser";
import type { Profile } from "./navbar.types";

const supabase = createBrowserSupabaseClient();

export function useNavbarAuth(onAfterLogout?: () => void) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

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
        setProfile(data as Profile);
      }

      setLoadingUser(false);
    };

    loadUserProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUserProfile();
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setProfile(null);
    onAfterLogout?.();
    window.location.href = "/login";
  };

  return {
    profile,
    loadingUser,
    handleLogout,
  };
}