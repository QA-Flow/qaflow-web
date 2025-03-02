"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaSearch, FaFilter } from "react-icons/fa";

interface TestReport {
  id: string;
  testCaseName: string;
  title: string;
  status: string;
  startTime: string;
  endTime: string;
  authorName: string;
  authorEmail: string;
  createdAt: string;
}

export default function TestReportsPage() {
  const [reports, setReports] = useState<TestReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/tests");
      const data = await response.json();
      
      if (data.reports) {
        setReports(data.reports);
      }
    } catch (error) {
      console.error("Error fetching test reports:", error);
      toast.error("Failed to load test reports");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed":
        return (
          <span className="badge badge-success gap-1 py-3">
            <FaCheckCircle /> Passed
          </span>
        );
      case "failed":
        return (
          <span className="badge badge-error gap-1 py-3">
            <FaTimesCircle /> Failed
          </span>
        );
      default:
        return (
          <span className="badge badge-warning gap-1 py-3">
            <FaExclamationTriangle /> {status}
          </span>
        );
    }
  };

  const formatDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationMs = endTime - startTime;
    
    if (durationMs < 1000) {
      return `${durationMs}ms`;
    } else if (durationMs < 60000) {
      return `${(durationMs / 1000).toFixed(2)}s`;
    } else {
      const minutes = Math.floor(durationMs / 60000);
      const seconds = ((durationMs % 60000) / 1000).toFixed(0);
      return `${minutes}m ${seconds}s`;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.testCaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.authorName && report.authorName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === "all" || 
      report.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Test Reports</h1>
      
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10 rounded-xl"
                placeholder="Search by test name, title, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="select select-bordered w-full pl-10 rounded-xl"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="skipped">Skipped</option>
              </select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Status</th>
                  <th className="hidden md:table-cell">Author</th>
                  <th className="hidden md:table-cell">Duration</th>
                  <th className="hidden lg:table-cell">Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <motion.tr 
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-gray-500">{report.testCaseName}</div>
                    </td>
                    <td>{getStatusBadge(report.status)}</td>
                    <td className="hidden md:table-cell">
                      {report.authorName ? (
                        <div>
                          <div>{report.authorName}</div>
                          <div className="text-xs text-gray-500">{report.authorEmail}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="hidden md:table-cell">
                      {formatDuration(report.startTime, report.endTime)}
                    </td>
                    <td className="hidden lg:table-cell">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <Link
                        href={`/dashboard/reports/${report.id}`}
                        className="btn btn-sm btn-outline rounded-xl"
                      >
                        View Details
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl text-gray-300 mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No test reports found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "Start submitting test reports using your API key to see them here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 