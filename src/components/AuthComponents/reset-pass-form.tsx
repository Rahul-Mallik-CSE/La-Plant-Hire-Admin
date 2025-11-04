/** @format */

"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export function ResetPassForm() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset submitted:", formData);
  };

  const handleBack = () => {
    console.log("Navigate back to OTP verification");
  };

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
        {/* Password Requirements */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Your password must be 8-10 character long.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="h-12 pr-10 border-gray-200 focus:border-gray-300 focus:ring-0 text-gray-600"
              required
              minLength={8}
              maxLength={10}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-type Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="h-12 pr-10 border-gray-200 focus:border-gray-300 focus:ring-0 text-gray-600"
              required
              minLength={8}
              maxLength={10}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Confirm Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 text-white font-medium text-base rounded-lg hover:opacity-90 transition-opacity bg-red-600 hover:bg-red-700"
            >
              Confirm
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
