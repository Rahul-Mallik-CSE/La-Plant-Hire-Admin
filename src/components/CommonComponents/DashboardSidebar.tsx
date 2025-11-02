/** @format */

"use client";

import type React from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import LogoutModal from "./LogOutModal";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

// import { logout } from "@/service/authService";
export default function DashboardSidebar() {
  return <DashboardSidebarContent />;
}

function DashboardSidebarContent() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { state } = useSidebar();

  const handleLogout = async () => {
    // Perform logout actions here (clear tokens, etc.)
    // Redirect to login page
    // await logout();
    // localStorage.removeItem("accessToken");
    router.push("/sign-in");
    setIsLogoutModalOpen(false);
  };

  if (
    pathname === "/sign-in" ||
    pathname === "/forget-pass" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-pass"
  ) {
    return null;
  }

  const isCollapsed = state === "collapsed";

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <SidebarTrigger />
      </div>
      <Sidebar
        className="border-r-0 border-transparent bg-[#F2F6FF]!"
        collapsible="icon"
      >
        <SidebarContent>
          <div
            className={`flex items-center justify-center px-0 md:px-2 py-6 relative ${
              isCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <div className="flex gap-2">
              <div className="rounded-full p-1 bg-blue-100">
                <FaUserAlt className="h-4 w-4" />
              </div>
              {!isCollapsed && <h1 className="font-bold text-base">ByeWind</h1>}
            </div>
            {/* Collapse button for desktop */}
            <div
              className={`absolute top-1 hidden md:block ${
                isCollapsed ? "right-0" : "right-0"
              }`}
            >
              <SidebarTrigger />
            </div>
          </div>

          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-2 items-center" : "md:px-6 space-y-1"
            }
          >
            {!isCollapsed && (
              <p className="text-xs text-gray-600 pl-4 pt-2">Dashboard</p>
            )}

            <NavItem
              href="/"
              icon={IoDocumentTextOutline}
              label="Enquiries"
              active={pathname === "/"}
              collapsed={isCollapsed}
            />

            <NavItem
              href="/confirmed-orders"
              icon={GiConfirmed}
              label="Confirmed Orders"
              active={
                pathname === "/confirmed-orders" ||
                pathname.startsWith("/confirmed-orders")
              }
              collapsed={isCollapsed}
            />

            <NavItem
              href="/cancelled-orders"
              icon={MdOutlineCancelPresentation}
              label="Cancelled Orders"
              active={
                pathname === "/cancelled-orders" ||
                pathname.startsWith("/cancelled-orders")
              }
              collapsed={isCollapsed}
            />
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className={` mb-8 ${isCollapsed ? "px-0" : "px-6"}`}>
          <div
            className={`flex items-center justify-center px-0 md:px-2 py-6 relative ${
              isCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <div className="flex gap-2">
              <Link href={"/"}>
                <Image
                  src="/logo/plant-logo.png"
                  alt="LA Plant Hire Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </Link>
              {!isCollapsed && (
                <h1 className="font-bold text-base">LA PLANT HIRE</h1>
              )}
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

// ...existing code...

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : "flex items-center gap-3 px-4 py-3 transition-colors rounded-md",
            active
              ? "bg-orange-100 text-orange-500 hover:bg-orange-100! hover:text-orange-500! font-medium"
              : "bg-transparent text-black hover:bg-orange-50! hover:text-orange-500! font-medium"
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-base">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...
