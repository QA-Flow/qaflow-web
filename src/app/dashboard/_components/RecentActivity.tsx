"use client";

import { FaChartLine, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";

interface RecentActivityProps {
  isLoading: boolean;
  totalTests: number;
  activities?: {
    id: string;
    title: string;
    status: string;
    time: string;
  }[];
}

export default function RecentActivity({ isLoading, totalTests, activities = [] }: RecentActivityProps) {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed":
        return <FaCheckCircle className="text-green-500" />;
      case "failed":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaExclamationTriangle className="text-yellow-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      className="rounded-lg bg-white shadow-md hover:shadow-lg transition-all h-full overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <div className="space-y-3">
            {activities.map((activity) => (
              <Link href={`/dashboard/reports/${activity.id}`} key={activity.id}>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                    ${activity.status.toLowerCase() === "passed" ? "bg-green-100" : 
                      activity.status.toLowerCase() === "failed" ? "bg-red-100" : "bg-yellow-100"}`
                  }>
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
            
            <div className="flex justify-end pt-3">
              <Link href="/dashboard/reports">
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors">View all activities</button>
              </Link>
            </div>
          </div>
        ) : totalTests > 0 ? (
          <div className="text-gray-600">
            <p>View your recent test reports in the Test Reports section.</p>
            <div className="flex justify-end pt-3">
              <Link href="/dashboard/reports">
                <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">Go to Test Reports</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <FaChartLine className="text-4xl mx-auto mb-3 text-gray-300" />
            <p>No activity yet</p>
            <p className="text-sm">Start submitting test reports to see your activity here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
} 