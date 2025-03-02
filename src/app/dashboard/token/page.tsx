"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Toaster, toast } from "react-hot-toast";
import { FaKey, FaSync, FaClipboard, FaCheck, FaShieldAlt, FaExclamationTriangle, FaBook, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

export default function ApiKeysPage() {
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copied, setCopied] = useState<'token' | 'bearer' | null>(null);

  useEffect(() => {
    fetchApiToken();
  }, []);

  const fetchApiToken = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/user/token");
      const data = await response.json();
      
      
      if (data.token) {
        setApiToken(data.token);
        setBearerToken(data.bearerToken || `Bearer ${data.token}`);
      }
    } catch (error) {
      console.error("Error fetching API token:", error);
      toast.error("Failed to load API token");
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateToken = async () => {
    try {
      setIsRegenerating(true);
      const response = await fetch("/api/user/token/regenerate", {
        method: "POST",
      });
      
      const data = await response.json();
      
      if (data.success) {
        setApiToken(data.token);
        setBearerToken(data.bearerToken || `Bearer ${data.token}`);
        toast.success("API token regenerated successfully");
      } else {
        toast.error(data.error || "Failed to regenerate token");
      }
    } catch (error) {
      console.error("Error regenerating token:", error);
      toast.error("An error occurred while regenerating token");
    } finally {
      setIsRegenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: 'token' | 'bearer') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success(type === 'token' ? "API token copied to clipboard" : "Bearer token copied to clipboard");
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <h1 className="text-3xl font-bold mb-8 text-gray-800">API Key</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <FaKey className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Your API Key</h2>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
              </div>
            ) : apiToken ? (
              <>
                <div className="mb-6">
                  <label className="text-sm text-gray-600 block mb-2">API Token</label>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={apiToken}
                      className="input input-bordered w-full rounded-r-none"
                    />
                    <button
                      onClick={() => copyToClipboard(apiToken, 'token')}
                      className="btn btn-primary rounded-l-none"
                    >
                      {copied === 'token' ? <FaCheck /> : <FaClipboard />}
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="text-sm text-gray-600 block mb-2">Authorization Header</label>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={bearerToken || ""}
                      className="input input-bordered w-full rounded-r-none"
                    />
                    <button
                      onClick={() => copyToClipboard(bearerToken || "", 'bearer')}
                      className="btn btn-primary rounded-l-none"
                    >
                      {copied === 'bearer' ? <FaCheck /> : <FaClipboard />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Use this value in the Authorization header when making API requests.
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={regenerateToken}
                    disabled={isRegenerating}
                    className="btn btn-outline btn-warning gap-2"
                  >
                    {isRegenerating ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <FaSync />
                        Regenerate Token
                      </>
                    )}
                  </button>
                </div>
                
                <div className="alert alert-warning mt-6">
                  <FaExclamationTriangle />
                  <span>
                    Regenerating will invalidate your current token and any systems using it will need to be updated.
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No API token found</p>
                <button
                  onClick={regenerateToken}
                  disabled={isRegenerating}
                  className="btn btn-primary gap-2"
                >
                  {isRegenerating ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FaKey />
                      Generate API Token
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <FaInfoCircle className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Information</h2>
            </div>
            
            <div className="prose max-w-none mb-6">
              <p>
                This API token is designed to be used with our npm module for test reporting. 
                The token provides secure access to the QA Flow API for submitting and retrieving test reports.
              </p>
              
              <div className="alert bg-blue-50 border-blue-100 mt-4">
                <div>
                  <FaInfoCircle className="text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Need help using this API token?</p>
                    <p className="text-blue-600">
                      See our comprehensive documentation for integration instructions, examples, and best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Link href="/docs" className="btn btn-primary btn-block gap-2">
              <FaBook />
              View API Documentation
            </Link>
          </div>
          
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center">
                <FaShieldAlt className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-xl font-semibold">Security Tips</h2>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full mt-1">
                  <span className="text-purple-600 text-xs font-bold">1</span>
                </div>
                <p className="text-gray-700">Keep your API token secure and never expose it in client-side code.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full mt-1">
                  <span className="text-purple-600 text-xs font-bold">2</span>
                </div>
                <p className="text-gray-700">Use environment variables to store your token in your applications.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full mt-1">
                  <span className="text-purple-600 text-xs font-bold">3</span>
                </div>
                <p className="text-gray-700">Regenerate your token if you suspect it has been compromised.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full mt-1">
                  <span className="text-purple-600 text-xs font-bold">4</span>
                </div>
                <p className="text-gray-700">Always use HTTPS when making API requests with your token.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 