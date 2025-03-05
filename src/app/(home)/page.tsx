"use client";

import Navbar from "@/components/Navbar";
import { motion } from "motion/react";
import Link from "next/link";
import { FaFlask, FaBug, FaChartLine, FaRocket, FaRegLightbulb, FaRegClock } from "react-icons/fa";

function Home() {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const MotionLink = motion.create(Link)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 drawer">
      <Navbar />
      <div className="drawer-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-32 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              QA Flow
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Revolutionizing Test Management with AI-Powered Insights
            </p>
            <MotionLink
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              href={"/docs"}
            >
              See Documents
            </MotionLink>
          </div>
        </motion.div>

        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FaFlask className="w-8 h-8 text-blue-600" />,
                title: "Smart Test Management",
                text: "AI-driven test case organization and prioritization",
              },
              {
                icon: <FaBug className="w-8 h-8 text-green-600" />,
                title: "Bug Prevention",
                text: "Predictive analytics to identify potential issues",
              },
              {
                icon: <FaChartLine className="w-8 h-8 text-purple-600" />,
                title: "Real-Time Analytics",
                text: "Interactive dashboards with live metrics",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white mb-24"
        >
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16">Transform Your Workflow</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "70%", label: "Faster Testing", icon: <FaRegClock className="w-12 h-12 mx-auto mb-4" /> },
                { value: "90%", label: "Bug Reduction", icon: <FaBug className="w-12 h-12 mx-auto mb-4" /> },
                { value: "95%", label: "Coverage", icon: <FaRegLightbulb className="w-12 h-12 mx-auto mb-4" /> },
                { value: "4x", label: "Efficiency", icon: <FaRocket className="w-12 h-12 mx-auto mb-4" /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm"
                >
                  {stat.icon}
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100 text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        
        <div className="text-center pb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto"
          >
            <div className="text-blue-600 mb-8">
              <FaRocket className="w-20 h-20 mx-auto animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Ready for Next-Level Testing?
            </h2>
            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of teams already revolutionizing their QA processes
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-12 py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;