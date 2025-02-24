"use client";

import { signInAction } from "@/lib/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const handleFormSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const res = await signInAction({ email, password });
    if (res.error) {
      alert(res.error);
      return;
    }
    redirect("/");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <Link 
        className="text-gray-600 hover:text-gray-900 mb-8 mx-auto flex items-center gap-2" 
        href="/"
      >
        <span className="text-lg">◄</span> Home
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <form 
          className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10 space-y-6" 
          action={handleFormSubmit}
        >
          <div className="space-y-2">
            <h1 className="text-center text-3xl font-bold text-gray-900">
              Sign In
            </h1>
            <p className="text-center text-sm text-gray-500">
              Welcome back! Please sign in to your account
            </p>
          </div>

          <div className="space-y-4">
            <input 
              name="email" 
              type="email" 
              placeholder="Email"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input 
              name="password" 
              type="password" 
              placeholder="Password"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button 
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>

          <Link 
            className="block text-center text-sm text-blue-600 hover:text-blue-500"
            href="/sign-up"
          >
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </main>
  );
}