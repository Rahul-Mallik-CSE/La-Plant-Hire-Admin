/** @format */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AuthGuard() {
  const router = useRouter();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    // Skip auth check on public pages
    const publicPages = [
      "/sign-in",
      "/forget-pass",
      "/verify-pass",
      "/verify-otp",
      "/reset-pass",
    ];
    if (publicPages.includes(pathname)) {
      return;
    }

    try {
      // Prefer localStorage token
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;

      if (!token) {
        // try cookie fallback
        const match = document.cookie.match(
          new RegExp("(^| )access_token=([^;]+)")
        );
        const cookieToken = match ? match[2] : null;
        if (!cookieToken) {
          router.push("/sign-in");
          return;
        }

        const decoded = jwtDecode<{ exp?: number }>(cookieToken);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < now) {
          // expired
          document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          router.push("/sign-in");
        }
        return;
      }

      const decoded = jwtDecode<{ exp?: number }>(token);
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        // expired
        document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push("/sign-in");
      }
    } catch {
      // if token is malformed, redirect
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";
      router.push("/sign-in");
    }
  }, [router, pathname]);

  return null;
}
