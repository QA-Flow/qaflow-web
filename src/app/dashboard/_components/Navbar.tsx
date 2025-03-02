"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaBell, FaSearch, FaQuestionCircle } from "react-icons/fa";
import { motion } from "motion/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="navbar z-10">
      <div className="navbar-start">
        <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden drawer-button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label> 
      </div>
    </div>
  );
} 