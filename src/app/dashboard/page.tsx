"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaKey, FaClipboardList, FaChartLine, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import DashboardCard from "./_components/DashboardCard";
import QuickActions from "./_components/QuickActions";
import RecentActivity from "./_components/RecentActivity";

interface DashboardStats {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  apiKeys: number;
}

interface Activity {
  id: string;
  title: string;
  status: string;
  time: string;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    apiKeys: 0
  });
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/dashboard/stats");
        const data = await response.json();
        
        if (data.stats) {
          setStats(data.stats);
          
          if (data.stats.totalTests > 0) {
            const mockActivities = [
              {
                id: "1",
                title: "Login Test Case Executed",
                status: "passed",
                time: "5 minutes ago"
              },
              {
                id: "2",
                title: "Payment Flow Validation",
                status: "failed",
                time: "2 hours ago"
              },
              {
                id: "3",
                title: "User Registration Test",
                status: "passed",
                time: "Yesterday"
              }
            ];
            setRecentActivities(mockActivities);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {session?.user?.username || "User"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's an overview of your QA testing metrics and activities.
          </p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card bg-white shadow">
              <div className="card-body animate-pulse">
                <div className="h-14 w-14 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="Total Tests"
            value={stats.totalTests}
            icon={<FaClipboardList />}
            color="blue"
            delay={0.1}
          />
          
          <DashboardCard 
            title="Passed Tests"
            value={stats.passedTests}
            icon={<FaCheckCircle />}
            color="green"
            delay={0.2}
          />
          
          <DashboardCard 
            title="Failed Tests"
            value={stats.failedTests}
            icon={<FaTimesCircle />}
            color="red"
            delay={0.3}
          />
          
          <DashboardCard 
            title="API Key"
            value={stats.apiKeys}
            icon={<FaKey />}
            color="purple"
            delay={0.4}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActions />
        
        <RecentActivity 
          isLoading={isLoading}
          totalTests={stats.totalTests}
          activities={recentActivities}
        />
      </div>
      
      <div className="card bg-white shadow-md">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FaChartLine className="text-cyan-500" />
            Test Trends
          </h2>
          
          {isLoading ? (
            <div className="h-64 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">
              <p className="text-gray-400">Loading chart data...</p>
            </div>
          ) : stats.totalTests > 0 ? (
            <div className="mockup-code bg-gray-800 text-white">
              <pre data-prefix="$"><code>Advanced analytics coming soon to QA Flow</code></pre>
              <pre data-prefix=">" className="text-success"><code>Stay tuned for visualizations and insights</code></pre>
              <pre data-prefix=">" className="text-error"><code>Failure trend detection</code></pre>
              <pre data-prefix=">" className="text-warning"><code>Performance benchmarking</code></pre>
              <pre data-prefix="$"><code>Release planned for next update</code></pre>
            </div>
          ) : (
            <div className="h-64 bg-gray-50 rounded-xl flex flex-col items-center justify-center">
              <FaChartLine className="text-5xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No data to visualize yet</h3>
              <p className="text-gray-500 text-center max-w-md">
                Start running tests to see analytics and trends over time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 