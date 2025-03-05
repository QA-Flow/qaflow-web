"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaKey, FaClipboardList, FaInfoCircle } from "react-icons/fa";

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="rounded-lg bg-white shadow-md hover:shadow-lg transition-all overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-600" />
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/dashboard/token">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-start w-full gap-3 py-3 px-4 rounded-xl border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FaKey />
              Manage API Key
            </motion.div>
          </Link>
          
          <Link href="/dashboard/reports">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-start w-full gap-3 py-3 px-4 rounded-xl border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <FaClipboardList />
              View Test Reports
            </motion.div>
          </Link>

        </div>
      </div>
    </motion.div>
  );
} 