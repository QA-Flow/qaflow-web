"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInValues } from "@/lib/form-schemas";
import { motion } from "motion/react";
import { FaEnvelope, FaLock } from "react-icons/fa";

interface LoginFormProps {
  onSubmit: SubmitHandler<SignInValues>;
  isSubmitting: boolean;
}

function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mx-auto" noValidate>
      <div className="w-full flex flex-col gap-1">
        <label className="flex flex-col">
          <span className="mb-1 font-medium text-gray-700">Email</span>
        </label>
        <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl bg-gray-50 ${errors.email ? 'border-red-500 border-2' : 'border-gray-200'} focus-within:border-blue-500 transition-all`}>
          <FaEnvelope className={`${errors.email ? 'text-red-500' : 'text-gray-400'}`} />
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="w-full flex flex-col gap-1">
        <label className="flex flex-col">
          <span className="mb-1 font-medium text-gray-700">Password</span>
        </label>
        <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl bg-gray-50 ${errors.password ? 'border-red-500 border-2' : 'border-gray-200'} focus-within:border-blue-500 transition-all`}>
          <FaLock className={`${errors.password ? 'text-red-500' : 'text-gray-400'}`} />
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="text-right">
        <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        ) : (
          "Sign In"
        )}
      </motion.button>
    </form>
  );
}

export default LoginForm;