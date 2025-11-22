/** @format */

"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/authAPI";

import { toast } from "sonner";
import { saveTokens } from "@/service/authService";

export function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await login({
        username: formData.email,
        password: formData.password,
      }).unwrap();

      // Store tokens in cookies
      await saveTokens(result.access);

      // Store access token in localStorage for API authorization
      localStorage.setItem("access_token", result.access);
      if (result.refresh) {
        localStorage.setItem("refresh_token", result.refresh);
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      const err = error as { data?: { detail?: string; message?: string } };
      const errorMessage =
        err?.data?.detail ||
        err?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Sign In
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-800"
            >
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email ..."
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-12 pl-10 border-gray-200 focus:border-gray-300 focus:ring-0 text-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-800"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-12 pr-10 border-gray-200 focus:border-gray-300 focus:ring-0 text-gray-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <Label
                htmlFor="rememberMe"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <Link
              href={"/forget-pass"}
              type="button"
              className="text-sm text-gray-600 hover:text-red-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-white font-medium text-base rounded-lg hover:opacity-90 transition-opacity bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
