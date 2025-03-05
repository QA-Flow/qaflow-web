"use client";

import React from "react";
import { motion } from "motion/react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "purple" | "orange" | "cyan";
  delay?: number;
}

const bgColors = {
  blue: "bg-blue-50",
  green: "bg-green-50",
  red: "bg-red-50",
  purple: "bg-purple-50",
  orange: "bg-orange-50",
  cyan: "bg-cyan-50",
};

const textColors = {
  blue: "text-blue-500",
  green: "text-green-500",
  red: "text-red-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
  cyan: "text-cyan-500",
};

export default function DashboardCard({ title, value, icon, color, delay = 0 }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { delay: 0 } }}
      className="rounded-lg bg-white shadow-md hover:shadow-lg transition-all overflow-hidden"
    >
      <div className="p-6">
        <div className={`${bgColors[color]} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
          <div className={`${textColors[color]} text-2xl`}>{icon}</div>
        </div>
        <h2 className="text-3xl font-bold mb-1">{value}</h2>
        <p className="text-gray-500">{title}</p>
      </div>
    </motion.div>
  );
} 