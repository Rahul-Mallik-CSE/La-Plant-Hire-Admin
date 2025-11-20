/** @format */

"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useVerifyOtpMutation } from "@/redux/features/authAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function VerifyOtpForm() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [email] = useState(() => {
    // Initialize email from sessionStorage
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("reset_email") || "";
    }
    return "";
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const router = useRouter();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please start over.");
      router.push("/forget-pass");
      return;
    }

    try {
      const result = await verifyOtp({
        email,
        otp: parseInt(otpString),
      }).unwrap();

      toast.success(result.message || "OTP verified successfully!");

      // Store the reset token for password reset request
      if (result.token) {
        sessionStorage.setItem("reset_token", result.token);
      }

      // Navigate to reset password page
      router.push("/reset-pass");
    } catch (error) {
      console.error("OTP verification error:", error);
      const err = error as { data?: { detail?: string; message?: string } };
      toast.error(
        err?.data?.detail ||
          err?.data?.message ||
          "Invalid OTP. Please try again."
      );
    }
  };

  const handleBack = () => {
    router.push("/forget-pass");
  };

  useEffect(() => {
    // Check if email exists, redirect if not
    if (!email) {
      toast.error("Email not found. Please start over.");
      router.push("/forget-pass");
      return;
    }

    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [router, email]);

  return (
    <Card className="w-full shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-lg font-medium">Verify Email</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-gray-800"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-white font-medium text-base rounded-lg hover:opacity-90 transition-opacity bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>

          {/* Helper Text */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Please enter the OTP we have sent you in your email.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
