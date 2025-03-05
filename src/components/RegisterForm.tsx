"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpValues } from "@/lib/form-schemas";
import { motion } from "motion/react";
import { FaEnvelope, FaLock, FaUser, FaShieldAlt } from "react-icons/fa";

interface RegisterFormProps {
  onSubmit: SubmitHandler<SignUpValues>;
  isSubmitting: boolean;
}

function RegisterForm({ onSubmit, isSubmitting }: RegisterFormProps) {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmitForm: SubmitHandler<SignUpValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5 mx-auto" noValidate>
      <div className="w-full flex flex-col gap-1 mx-auto">
        <label className="flex flex-col">
          <span className="mb-1 font-medium text-gray-700">Username</span>
        </label>
        <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl bg-gray-50 ${errors.username ? 'border-red-500 border-2' : 'border-gray-200'} focus-within:border-blue-500 transition-all`}>
          <FaUser className={`${errors.username ? 'text-red-500' : 'text-gray-400'}`} />
          <input
            {...register("username")}
            type="text"
            placeholder="johndoe"
            className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">
            {errors.username.message}
          </p>
        )}
      </div>

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

      <div className="w-full flex flex-col gap-1">
        <label className="flex flex-col">
          <span className="mb-1 font-medium text-gray-700">Confirm Password</span>
        </label>
        <div className={`flex items-center gap-2 px-3 py-2 border rounded-xl bg-gray-50 ${errors.confirmPassword ? 'border-red-500 border-2' : 'border-gray-200'} focus-within:border-blue-500 transition-all`}>
          <FaShieldAlt className={`${errors.confirmPassword ? 'text-red-500' : 'text-gray-400'}`} />
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="••••••••"
            className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="w-full flex flex-col gap-1">
        <label className="flex items-center cursor-pointer gap-2">
          <input 
            type="checkbox" 
            className={`h-4 w-4 rounded border ${errors.terms ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-600'} focus:ring-2 focus:ring-blue-500`}
            {...register("terms")}
          />
          <span className="text-gray-600">
            I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.terms && (
          <p className="text-sm text-red-500 mt-1">
            {errors.terms.message}
          </p>
        )}
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
          "Create Account"
        )}
      </motion.button>
    </form>
  );
}

export default RegisterForm; 