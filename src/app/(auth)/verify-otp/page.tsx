/** @format */

import AuthHeader from "@/components/AuthComponents/auth-header";
import { VerifyOtpForm } from "@/components/AuthComponents/verify-otp-form";

export default function ForgetPass() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto  ">
        <AuthHeader />

        <div className="max-w-2xl mx-auto h-full pt-14">
          <VerifyOtpForm />
        </div>
      </div>
    </div>
  );
}
