"use client";

import { signUpSchema } from "@/lib/form-schemas";
import { signUpAction } from "@/lib/actions";
import Link from "next/link";

export default function SignUpPage() {
  const handleFormSubmit = async (formData: FormData) => {
    const formValues = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const { error } = await signUpSchema.safeParseAsync(formValues);
    if (error) {
      alert(error.issues[0].message);
    }

    const res = await signUpAction(formValues);
    if (res?.error) {
      alert(res.error);
    }
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
              Sign Up
            </h1>
            <p className="text-center text-sm text-gray-500">
              Demo app, please don't use your real email or password
            </p>
          </div>

          <div className="space-y-4">
            <input 
              name="username" 
              type="text" 
              placeholder="Username"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
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
            Sign Up
          </button>

          <Link 
            className="block text-center text-sm text-blue-600 hover:text-blue-500"
            href="/sign-in"
          >
            Already have an account? Sign In
          </Link>
        </form>
      </div>
    </main>
  );
}