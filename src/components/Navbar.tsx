"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    const links = [
        { name: "Sign In", href: "/login" },
        { name: "Sign Up", href: "/register" },
    ];

    return (
        <div className="relative w-full">
            <div className="w-full flex items-center px-4 py-3">
                <div className="mx-2 flex-1 px-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        QA Flow
                    </span>
                </div>
                <div className="hidden flex-none sm:block">
                    <ul className="flex space-x-4">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className="text-black hover:text-blue-600 px-3 py-2 rounded-md transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Mobile menu button */}
                <button 
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 sm:hidden"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
                <div className="sm:hidden absolute w-full bg-white shadow-md z-50 border-t border-gray-100">
                    <ul className="flex flex-col py-2">
                        {links.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} 
                                    className="block w-full text-gray-700 hover:bg-gray-50 hover:text-blue-600 px-4 py-3 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}