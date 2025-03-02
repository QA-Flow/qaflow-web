"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Toaster, toast } from "react-hot-toast";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaClock, FaUser, FaDesktop, FaChrome, FaWindows } from "react-icons/fa";

interface TestStep {
  name: string;
  description: string;
  status: string;
  timestamp?: string | number;
  duration?: number;
  error?: string | {
    message: string;
    stack?: string;
  };
  screenshot?: string;
}

interface Environment {
  name?: string;
  browser?: string;
  browserVersion?: string;
  version?: string;
  os?: string;
  osVersion?: string;
  device?: string;
  viewport?: string;
}

interface TestReport {
  id: string;
  testCaseName: string;
  title: string;
  description?: string;
  status: string;
  startTime: string;
  endTime: string;
  authorName: string;
  authorEmail: string;
  tester?: {
    author: string;
    email: string;
  };
  environment: Environment;
  steps: TestStep[];
  duration: number;
  createdAt: string;
}

export default function TestReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<TestReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchReport(params.id as string);
    }
  }, [params.id]);

  const fetchReport = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/tests/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch report");
      }
      
      const data = await response.json();
      setReport(data.report);
    } catch (error) {
      console.error("Error fetching test report:", error);
      toast.error("Failed to load test report");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed":
        return (
          <span className="badge badge-success gap-1 py-3 px-4">
            <FaCheckCircle /> Passed
          </span>
        );
      case "failed":
        return (
          <span className="badge badge-error gap-1 py-3 px-4">
            <FaTimesCircle /> Failed
          </span>
        );
      case "skipped":
        return (
          <span className="badge badge-warning gap-1 py-3 px-4">
            <FaExclamationTriangle /> Skipped
          </span>
        );
      default:
        return (
          <span className="badge badge-info gap-1 py-3 px-4">
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

  const getStepStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed":
        return <FaCheckCircle className="text-success text-lg" />;
      case "failed":
        return <FaTimesCircle className="text-error text-lg" />;
      case "skipped":
        return <FaExclamationTriangle className="text-warning text-lg" />;
      default:
        return <FaExclamationTriangle className="text-info text-lg" />;
    }
  };

  const getBrowserIcon = (browser: string) => {
    if (browser?.toLowerCase().includes("chrome")) {
      return <FaChrome className="text-lg" />;
    }
    return null;
  };

  const getOSIcon = (os: string) => {
    if (os?.toLowerCase().includes("windows")) {
      return <FaWindows className="text-lg" />;
    }
    return null;
  };

  
  const formatTimestamp = (timestamp: string | number | undefined) => {
    if (!timestamp) return null;
    
    
    if (typeof timestamp === 'number' || !isNaN(Number(timestamp))) {
      return new Date(Number(timestamp)).toLocaleTimeString();
    }
    
    
    return new Date(timestamp).toLocaleTimeString();
  };

  
  const formatError = (error: string | { message: string; stack?: string } | undefined) => {
    if (!error) return null;
    
    if (typeof error === 'string') {
      return error;
    }
    
    return error.message;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="btn btn-ghost gap-2 mb-8"
        >
          <FaArrowLeft /> Back to Reports
        </button>
        
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
          <div className="text-5xl text-gray-300 mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Report Not Found</h2>
          <p className="text-gray-500 mb-6">The test report you're looking for doesn't exist or you don't have permission to view it.</p>
          <button 
            onClick={() => router.push("/dashboard/reports")}
            className="btn btn-primary rounded-xl"
          >
            View All Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <button 
        onClick={() => router.back()}
        className="btn btn-ghost gap-2 mb-8"
      >
        <FaArrowLeft /> Back to Reports
      </button>
      
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
        <div className="p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{report.title}</h1>
              <p className="text-gray-500">{report.testCaseName}</p>
              {report.description && <p className="text-gray-600 mt-2">{report.description}</p>}
            </div>
            <div>{getStatusBadge(report.status)}</div>
          </div>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-xl">
              <FaClock className="text-blue-500 text-xl" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-semibold">
                {report.duration
                  ? formatDuration(report.startTime, report.endTime)
                  : formatDuration(report.startTime, report.endTime)}
              </div>
            </div>
          </div>
          
          {(report.authorName || report.tester?.author) && (
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-3 rounded-xl">
                <FaUser className="text-purple-500 text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Author</div>
                <div className="font-semibold">{report.tester?.author || report.authorName}</div>
                {(report.tester?.email || report.authorEmail) && (
                  <div className="text-xs text-gray-500">{report.tester?.email || report.authorEmail}</div>
                )}
              </div>
            </div>
          )}
          
          {report.environment?.browser && (
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-3 rounded-xl">
                {getBrowserIcon(report.environment.browser) || <FaChrome className="text-green-500 text-xl" />}
              </div>
              <div>
                <div className="text-sm text-gray-500">Browser</div>
                <div className="font-semibold">
                  {report.environment.name || report.environment.browser}
                  {(report.environment.version || report.environment.browserVersion) && 
                    ` (${report.environment.version || report.environment.browserVersion})`}
                </div>
                {report.environment.viewport && (
                  <div className="text-xs text-gray-500">Viewport: {report.environment.viewport}</div>
                )}
              </div>
            </div>
          )}
          
          {report.environment?.os && (
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 p-3 rounded-xl">
                {getOSIcon(report.environment.os) || <FaDesktop className="text-orange-500 text-xl" />}
              </div>
              <div>
                <div className="text-sm text-gray-500">OS</div>
                <div className="font-semibold">
                  {report.environment.os}
                  {report.environment.osVersion && ` (${report.environment.osVersion})`}
                </div>
                {report.environment.device && (
                  <div className="text-xs text-gray-500">Device: {report.environment.device}</div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-8 border-t border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Test Steps</h2>
          
          {report.steps && report.steps.length > 0 ? (
            <ul className="steps-timeline">
              {report.steps.map((step, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 mb-4 rounded-2xl ${
                    step.status.toLowerCase() === "passed" 
                      ? "bg-success/10" 
                      : step.status.toLowerCase() === "failed"
                      ? "bg-error/10"
                      : "bg-warning/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getStepStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{step.name || step.description}</h3>
                        <div className="flex items-center gap-3">
                          {step.duration && (
                            <span className="text-sm text-gray-500">
                              {step.duration < 1000 
                                ? `${step.duration}ms` 
                                : `${(step.duration / 1000).toFixed(2)}s`}
                            </span>
                          )}
                          {step.timestamp && (
                            <span className="text-sm text-gray-500">
                              {formatTimestamp(step.timestamp)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {step.description && step.name && (
                        <p className="text-gray-600 mb-2">{step.description}</p>
                      )}
                      
                      {step.error && (
                        <div className="mt-3 p-4 bg-error/5 rounded-xl border border-error/20">
                          <div className="font-mono text-sm text-error mb-2">
                            {formatError(step.error)}
                          </div>
                          {typeof step.error === 'object' && step.error.stack && (
                            <details>
                              <summary className="cursor-pointer text-xs text-gray-500 hover:text-gray-700">
                                Stack Trace
                              </summary>
                              <pre className="mt-2 p-3 bg-gray-800 text-gray-200 rounded-lg overflow-x-auto text-xs">
                                {step.error.stack}
                              </pre>
                            </details>
                          )}
                        </div>
                      )}
                      
                      {step.screenshot && (
                        <div className="mt-3">
                          <details>
                            <summary className="cursor-pointer text-xs text-primary hover:text-primary-focus">
                              View Screenshot
                            </summary>
                            <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={step.screenshot}
                                alt={`Screenshot for ${step.name || step.description}`}
                                className="w-full"
                              />
                            </div>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No steps recorded for this test.
            </div>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-500 text-right">
        Test executed on {new Date(report.startTime).toLocaleString()}
      </div>
    </div>
  );
} 