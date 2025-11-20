/** @format */

"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { useForgetPasswordMutation } from "@/redux/features/authAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ForgetPassForm() {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const result = await forgetPassword({ username: email }).unwrap();
      toast.success(result.message || "OTP sent to your email!");

      // Store email in sessionStorage for next step
      sessionStorage.setItem("reset_email", email);

      // Navigate to OTP verification page
      router.push("/verify-otp");
    } catch (error) {
      console.error("Forget password error:", error);
      const err = error as { data?: { detail?: string; message?: string } };
      toast.error(
        err?.data?.detail ||
          err?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    }
  };

  const handleBack = () => {
    router.push("/sign-in");
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleBack}
            className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-lg font-medium">Forget Password</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter your email ..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-10 border-gray-200 focus:border-gray-300 focus:ring-0 text-gray-600"
              required
            />
          </div>

          {/* Send OTP Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-white font-medium text-base rounded-lg hover:opacity-90 transition-opacity bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
