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
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium text-gray-700">Email</span>
        </label>
        <label className={`input input-bordered flex items-center gap-2 rounded-xl bg-gray-50 ${errors.email ? 'border-error border-2' : 'border-gray-200'} focus-within:border-blue-500 transition-all`}>
          <FaEnvelope className={`${errors.email ? 'text-error' : 'text-gray-400'}`} />
          <input
            {...register("email")}
            type="email"
            placeholder="your@email.com"
            className="grow bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </label>
        {errors.email && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.email.message}
            </span>
          </label>
        )}
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium text-gray-700">Password</span>
        </label>
        <label className={`input input-bordered flex items-center gap-2 rounded-xl bg-gray-50 ${errors.password ? 'border-error border-2' : 'border-gray-200'} focus-within:border-blue-500 transition-all`}>
          <FaLock className={`${errors.password ? 'text-error' : 'text-gray-400'}`} />
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="grow bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </label>
        {errors.password && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.password.message}
            </span>
          </label>
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
        className={`btn w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 border-none text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Sign In"
        )}
      </motion.button>
    </form>
  );
}

export default LoginForm;