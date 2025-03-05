"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
      <h1 className="text-3xl font-bold mb-2 text-gray-800">API Key</h1>
      <p className="text-gray-500 mb-8">Manage your API access credentials</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <FaKey className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Your API Key</h2>
                  <p className="text-sm text-gray-500">Used for authenticating with the QA Flow service</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-4"></div>
                  <p className="text-gray-500">Loading your API key...</p>
                </div>
              ) : apiToken ? (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Token</label>
                    <div className="flex">
                      <input
                        type="text"
                        readOnly
                        value={apiToken}
                        className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-l-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => copyToClipboard(apiToken, 'token')}
                        className="inline-flex items-center px-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {copied === 'token' ? <FaCheck className="mr-2" /> : <FaClipboard className="mr-2" />}
                        Copy
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Authorization Header</label>
                    <div className="flex">
                      <input
                        type="text"
                        readOnly
                        value={bearerToken || ""}
                        className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-l-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => copyToClipboard(bearerToken || "", 'bearer')}
                        className="inline-flex items-center px-4 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {copied === 'bearer' ? <FaCheck className="mr-2" /> : <FaClipboard className="mr-2" />}
                        Copy
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
                      className="inline-flex items-center px-5 py-2.5 border border-yellow-500 rounded-lg text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      {isRegenerating ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-yellow-200 border-t-yellow-600 animate-spin mr-3"></div>
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <FaSync className="mr-2" />
                          Regenerate Token
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-6 rounded-lg bg-amber-50 border border-amber-100 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaExclamationTriangle className="h-5 w-5 text-amber-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800">Warning</h3>
                        <div className="mt-2 text-sm text-amber-700">
                          <p>
                            Regenerating will invalidate your current token and any systems using it will need to be updated.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                    <FaKey className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No API token found</h3>
                  <p className="text-gray-500 mb-6">Generate an API token to start using the QA Flow service</p>
                  <button
                    onClick={regenerateToken}
                    disabled={isRegenerating}
                    className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isRegenerating ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-3"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FaKey className="mr-2" />
                        Generate API Token
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <FaInfoCircle className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Information</h2>
                  <p className="text-sm text-gray-500">About using your API token</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="prose prose-sm max-w-none mb-6">
                <p className="text-gray-600">
                  This API token is designed to be used with our npm module for test reporting. 
                  The token provides secure access to the QA Flow API for submitting and retrieving test reports.
                </p>
                
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Need help using this API token?</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          See our comprehensive documentation for integration instructions, examples, and best practices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/docs" 
                className="flex w-full items-center justify-center px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaBook className="mr-2" />
                View API Documentation
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-400 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                  <FaShieldAlt className="text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Security Tips</h2>
                  <p className="text-sm text-gray-500">Best practices for API token security</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-semibold text-xs">1</div>
                  <p className="text-sm text-gray-700">Keep your API token secure and never expose it in client-side code.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-semibold text-xs">2</div>
                  <p className="text-sm text-gray-700">Use environment variables to store your token in your applications.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-semibold text-xs">3</div>
                  <p className="text-sm text-gray-700">Regenerate your token if you suspect it has been compromised.</p>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-semibold text-xs">4</div>
                  <p className="text-sm text-gray-700">Always use HTTPS when making API requests with your token.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 