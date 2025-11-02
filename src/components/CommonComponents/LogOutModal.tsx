/** @format */

"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex justify-center text-red-500">
          <h2 className="flex items-center text-2xl font-semibold">
            <LogOut className="mr-2 h-6 w-6" /> Sign Out
          </h2>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h3 className="mb-2 text-xl font-semibold">
            Are you sure you want to{" "}
            <span className="font-bold text-red-500">sign out?</span>
          </h3>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onClose} className="w-1/2">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="w-1/2 text-white bg-red-500 hover:bg-red-600"
          >
            Yes, Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
