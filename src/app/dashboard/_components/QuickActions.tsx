"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FaKey, FaClipboardList, FaPlus, FaChartLine, FaInfoCircle } from "react-icons/fa";

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="card bg-white shadow-md hover:shadow-lg transition-all"
    >
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-primary" />
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/dashboard/token">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline btn-block justify-start gap-3 rounded-xl"
            >
              <FaKey />
              Manage API Key
            </motion.div>
          </Link>
          
          <Link href="/dashboard/reports">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline btn-block justify-start gap-3 rounded-xl"
            >
              <FaClipboardList />
              View Test Reports
            </motion.div>
          </Link>
          
          <Link href="/dashboard/analytics">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline btn-block justify-start gap-3 rounded-xl"
            >
              <FaChartLine />
              Analytics
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 