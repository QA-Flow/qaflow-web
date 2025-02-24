import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          {/* Logo veya Site Başlığı */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to Our App
            </h1>
            <p className="text-lg text-gray-600">
              Your one-stop solution for everything
            </p>
          </div>

          {/* Auth Status Card */}
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="text-center">
              {session ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-blue-600">
                          {session.user?.email?.[0].toUpperCase()}
                          {session.user?.id}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      {session.user?.name || 'Welcome back!'} 
                    </p>
                    <p className="text-gray-500">{session.user?.email}</p>
                  </div>
                  <Link
                    href="/api/auth/signout"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Sign Out
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Please sign in to access your account
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full bg-white text-blue-600 px-4 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors duration-200"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 Your App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
