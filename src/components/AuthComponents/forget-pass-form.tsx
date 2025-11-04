/** @format */

"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";

export function ForgetPassForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Send OTP to:", email);
  };

  const handleBack = () => {
    console.log("Navigate back to sign in");
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
            className="w-full h-12 text-white font-medium text-base rounded-lg hover:opacity-90 transition-opacity bg-red-600 hover:bg-red-700"
          >
            Send OTP
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
