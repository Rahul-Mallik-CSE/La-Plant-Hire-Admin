/** @format */

import AuthHeader from "@/components/AuthComponents/auth-header";
import { SignInForm } from "@/components/AuthComponents/signIn-form";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-[#fff4f1]">
      <div className="container mx-auto  ">
        <AuthHeader />

        <div className="max-w-2xl mx-auto h-full pt-10">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
