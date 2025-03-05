"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FaHome, 
  FaKey, 
  FaClipboardList, 
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpen(prevState => !prevState);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      closeSidebar();
    }
  }, [pathname, isOpen, closeSidebar]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeSidebar();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeSidebar]);

  const handleSignOut = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await signOut({ redirect: true, redirectTo: "/login" });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }, [router]);

  const menuItems = [
    {
      icon: <FaHome className="w-5 h-5" />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <FaKey className="w-5 h-5" />,
      label: "API Key",
      href: "/dashboard/token",
    },
    {
      icon: <FaClipboardList className="w-5 h-5" />,
      label: "Test Reports",
      href: "/dashboard/reports",
    }
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <button 
        type="button" 
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 sm:hidden" 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside 
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg flex flex-col">
          {/* QA Flow Logo */}
          <div className="flex items-center mb-4">
            <Link href="/dashboard" className="flex items-center gap-3 text-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                QA Flow
              </span>
            </Link>
            
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 sm:hidden" 
              onClick={toggleSidebar}
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

            <ul className="font-medium space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group ${
                      isActive(item.href) ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span className={`w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 ${
                      isActive(item.href) ? 'text-gray-900' : ''
                    }`}>
                      {item.icon}
                    </span>
                    <span className="flex-1 ms-3 whitespace-nowrap">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
    
            <div className="flex-grow"></div>
            
            <div className="mt-auto border-t border-gray-400 border-spacing-4">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center mt-2 p-2 text-red-500 rounded-lg hover:bg-red-50 group cursor-pointer"
              >
                <span className="w-5 h-5 transition duration-75 text-red-500">
                  <FaSignOutAlt />
                </span>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </button>
              
              <div className="mt-3 text-xs text-center text-gray-500">
                QA Flow v1.0.0
              </div>
            </div>
          </div>
      </aside>
    </>
  );
} 