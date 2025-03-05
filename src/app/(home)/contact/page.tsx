"use client";

import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred.");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We&apos;re here to help with any questions about our platform. 
            Reach out to us and we&apos;ll respond as soon as we can.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
            
            {submitStatus === "success" && (
              <div className="mb-6 bg-green-50 p-4 rounded-lg flex items-center text-green-700">
                <FaCheckCircle className="mr-2 text-green-500" />
                <p>Your message has been sent successfully! We'll get back to you shortly.</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 bg-red-50 p-4 rounded-lg flex items-center text-red-700">
                <FaExclamationCircle className="mr-2 text-red-500" />
                <p>{errorMessage || "There was an error sending your message. Please try again."}</p>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isSubmitting 
                    ? "bg-blue-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Our team is available Monday through Friday from 9am to 5pm to assist you with any inquiries.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">support@qaflow.com</p>
                  <p className="text-gray-600">info@qaflow.com</p>
                </div>
              </div>

              {/*
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">Mon-Fri 9am-5pm</p>
                </div>
              </div>
              */}

              {/*
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Location</h3>
                  <p className="text-gray-600">123 Testing Street</p>
                  <p className="text-gray-600">San Francisco, CA 94103</p>
                </div>
              </div>
              */}
            </div>

            <div className="mt-10 bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Office Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span>Closed</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 