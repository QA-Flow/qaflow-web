"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  FaHome, 
  FaKey, 
  FaClipboardList, 
  FaUser, 
  FaSignOutAlt
} from "react-icons/fa";

import { motion } from "motion/react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

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
    <div className="drawer-side z-20">
      <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      
      <div className="w-80 min-h-full bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              QA Flow
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="menu menu-lg gap-2 p-0 w-full">
            {menuItems.map((item) => (
              <motion.li 
                key={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl ${isActive(item.href) ? 'bg-primary/10 text-primary font-medium' : ''}`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="btn btn-outline btn-error w-full justify-start gap-3 rounded-xl"
          >
            <FaSignOutAlt />
            Sign Out
          </motion.button>
        </div>
        
        <div className="p-4 text-xs text-center text-gray-400">
          QA Flow v1.0.0
        </div>
      </div>
    </div>
  );
} 