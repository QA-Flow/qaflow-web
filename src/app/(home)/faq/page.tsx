"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What is QA Flow?",
          answer:
            "QA Flow is a next-generation test management platform designed for modern teams. It helps you organize, execute, and track your testing processes more efficiently, with powerful features for collaboration and reporting."
        },
        {
          question: "How do I get started with QA Flow?",
          answer:
            "Getting started is easy! Simply register for an account, verify your email, and you'll be guided through our onboarding process. You can import your existing test cases or start creating new ones right away."
        },
        {
          question: "Is there a free trial available?",
          answer:
            "Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start your trial."
        }
      ]
    },
    {
      title: "Account & Billing",
      questions: [
        {
          question: "How do I change my password?",
          answer:
            "You can change your password by going to your Account Settings page. Look for the 'Security' tab, where you'll find the option to update your password."
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal. For enterprise plans, we also offer invoicing options."
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer:
            "Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle. When upgrading, you'll get immediate access to additional features."
        }
      ]
    },
    {
      title: "Features & Functionality",
      questions: [
        {
          question: "Can I import test cases from other tools?",
          answer:
            "Yes, QA Flow supports importing test cases from various formats including CSV, Excel, and direct integrations with popular tools like Jira, TestRail, and more."
        },
        {
          question: "Does QA Flow support API testing?",
          answer:
            "Absolutely! QA Flow provides robust API testing capabilities, allowing you to define, execute, and monitor API tests from within the platform."
        },
        {
          question: "What kind of reports can I generate?",
          answer:
            "QA Flow offers comprehensive reporting with customizable dashboards. You can generate test execution reports, coverage reports, trend analysis, and more. All reports can be exported in various formats."
        }
      ]
    }
  ];

  const filteredFAQs = searchQuery.trim() === ""
    ? faqCategories
    : faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(item =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0);

  const Accordion = ({ question, answer, index, isOpen, toggleAccordion }: any) => (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <span className="text-blue-600 ml-2">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions about QA Flow. If you don&apos;t see what you&apos;re looking for, 
            feel free to contact our support team.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">{category.title}</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                {category.questions.map((faq, index) => (
                  <Accordion
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    index={`${categoryIndex}-${index}`}
                    isOpen={openIndex === `${categoryIndex}-${index}`}
                    toggleAccordion={() => 
                      setOpenIndex(openIndex === `${categoryIndex}-${index}` ? null : `${categoryIndex}-${index}`)
                    }
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search or browse through our categories.
            </p>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg shadow-md p-8 mt-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            If you couldn&apos;t find the answer you were looking for, our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
} 