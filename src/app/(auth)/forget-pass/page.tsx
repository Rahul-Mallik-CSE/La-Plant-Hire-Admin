/** @format */

import AuthHeader from "@/components/AuthComponents/auth-header";
import { ForgetPassForm } from "@/components/AuthComponents/forget-pass-form";

export default function ForgetPass() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto  ">
        <AuthHeader />

        <div className="max-w-2xl mx-auto h-full pt-14">
          <ForgetPassForm />
        </div>
      </div>
    </div>
  );
}
