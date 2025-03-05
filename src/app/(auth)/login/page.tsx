"use client";

import LoginForm from "@/components/LoginForm";
import { SignInValues } from "@/lib/form-schemas";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { signInAction } from "@/lib/actions";
import { Toaster, toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

export default function LoginPage() {
  const session = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = async (data: SignInValues) => {
    setIsSubmitting(true);
    const result = await signInAction(data);
    if (result.success) {
      await session.update();
      toast.success("Login successful!", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
      
    setTimeout(() => {
      router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Toaster />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-full max-w-md bg-white shadow-xl rounded-3xl overflow-hidden"
      >
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              QA Flow
            </h1>
            <p className="text-gray-600">
              Sign in to your account
            </p>
            {callbackUrl && (
              <p className="text-sm text-blue-600 mt-2">
                You need to sign in to access this page
              </p>
            )}
          </div>

          <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

          <div className="text-center mt-6">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}