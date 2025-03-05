"use client";

import { motion } from "motion/react";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        // { label: "Features", href: "/features" },
        // { label: "Pricing", href: "/pricing" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        // { label: "Support", href: "/support" },
        // { label: "Blog", href: "/blog" },
         { label: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  
  const socialLinks = [
    { icon: <FaTwitter />, label: "Twitter", href: "https://twitter.com" },
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/company/qaflow-tech/" },
    { icon: <FaInstagram />, label: "Instagram", href: "https://instagram.com" },
    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/qa-flow" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                QA Flow
              </span>
            </h2>
            <p className="text-gray-400">
              Next-gen test management for modern teams.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-2xl">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400">
              Get the latest updates and news straight to your inbox.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} QA Flow. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}