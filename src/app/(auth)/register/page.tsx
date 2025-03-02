"use client";

import RegisterForm from "@/components/RegisterForm";
import { SignUpValues } from "@/lib/form-schemas";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import { signUpAction } from "@/lib/actions";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: SignUpValues) => {
    setIsSubmitting(true);
    try {
      const result = await signUpAction(data);
      
      if (result?.error) {
        toast.error(result.error, {
          position: "top-right",
          duration: 3000,
        });
      } else {
        toast.success("Account created successfully!", {
          position: "top-right",
          duration: 3000,
        });
        
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
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
              Create your account
            </p>
          </div>
          <RegisterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          <div className="text-center mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}