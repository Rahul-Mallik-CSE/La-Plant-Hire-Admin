/** @format */

"use client";

import React, { useState } from "react";
import { Bell, LogOut, Search } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import LogoutModal from "./LogOutModal";

import { toast } from "sonner";

import { logout } from "@/service/authService";

const NavBar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // Store in localStorage so tables can read it
    if (value.trim()) {
      localStorage.setItem("table_search", value.trim());
    } else {
      localStorage.removeItem("table_search");
    }
    // Trigger storage event for other components
    window.dispatchEvent(new Event("storage"));
  };

  const handleLogout = async () => {
    // Clear tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Clear access_token cookie
    document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";

    // Clear authentication tokens from server cookies
    await logout();

    // Close modal
    setIsLogoutModalOpen(false);

    // Show success message
    toast.success("Logged out successfully");

    // Redirect to login page
    router.push("/sign-in");
  };

  if (
    pathname === "/sign-in" ||
    pathname === "/forget-pass" ||
    pathname === "/verify-pass" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-pass"
  ) {
    return null;
  }

  const getPageTitle = (path: string | null) => {
    if (!path) return "";
    if (path === "/") return "Enquiries";
    if (path.startsWith("/confirmed-orders")) return "Confirmed Orders";
    if (path.startsWith("/cancelled-orders")) return "Cancelled Orders";
    if (path.startsWith("/completed-orders")) return "Completed Orders";
    if (path.startsWith("/settings")) return "Settings";
    // fallback: use the last segment and capitalize words
    const parts = path.split("/").filter(Boolean);
    const last = parts[parts.length - 1] || "";
    return last
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <>
      <div className="w-full h-16 bg-white flex items-center px-2 md:px-6 shadow-md border-b border-gray-200">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-3 text-sm ">
            <p className="text-gray-600">Dashboard</p>
            <p className="text-black">/</p>
            <p className="text-black font-medium">{pageTitle}</p>
          </div>
          {/* right side of navbar */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-48 md:w-64 h-9 pl-9 pr-4 bg-gray-100 border-0 rounded-lg text-sm text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            {/* Notification Bell */}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-700" />
            </button>

            {/* Logout Icon */}
            <Button
              className="bg-transparent hover:bg-red-50 rounded-lg transition-colors group p-2"
              aria-label="Logout"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <LogOut className="h-5 w-5 text-orange-500 group-hover:text-orange-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default NavBar;
