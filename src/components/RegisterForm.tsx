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
    watch,
  } = form;

  const password = watch("password");

  const onSubmitForm: SubmitHandler<SignUpValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5 mx-auto" noValidate>
      <div className="form-control mx-auto">
        <label className="label">
          <span className="label-text font-medium text-gray-700">Username</span>
        </label>
        <label className={`input input-bordered flex items-center gap-2 rounded-xl bg-gray-50 ${errors.username ? 'border-error border-2' : 'border-gray-200'} focus-within:border-blue-500 transition-all`}>
          <FaUser className={`${errors.username ? 'text-error' : 'text-gray-400'}`} />
          <input
            {...register("username")}
            type="text"
            placeholder="johndoe"
            className="grow bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </label>
        {errors.username && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.username.message}
            </span>
          </label>
        )}
      </div>

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

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium text-gray-700">Confirm Password</span>
        </label>
        <label className={`input input-bordered flex items-center gap-2 rounded-xl bg-gray-50 ${errors.confirmPassword ? 'border-error border-2' : 'border-gray-200'} focus-within:border-blue-500 transition-all`}>
          <FaShieldAlt className={`${errors.confirmPassword ? 'text-error' : 'text-gray-400'}`} />
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="••••••••"
            className="grow bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
          />
        </label>
        {errors.confirmPassword && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.confirmPassword.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input 
            type="checkbox" 
            className={`checkbox checkbox-sm ${errors.terms ? 'checkbox-error' : 'checkbox-primary'}`}
            {...register("terms")}
          />
          <span className="label-text text-gray-600">
            I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </span>
        </label>
        {errors.terms && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.terms.message}
            </span>
          </label>
        )}
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
          "Create Account"
        )}
      </motion.button>
    </form>
  );
}

export default RegisterForm; 