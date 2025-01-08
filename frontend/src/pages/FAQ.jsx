import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What can I do on ShopSphere?",
      answer:
        "ShopSphere allows you to browse through a variety of products, view detailed information about them, and add your favorites to a shopping cart.",
    },
    {
      question: " How do I manage my shopping cart?",
      answer:
        "The shopping cart allows you to add, remove, or update products in real-time. You can review your selections before proceeding to checkout for a hassle-free shopping experience",
    },
    {
      question: "Can I sell my own products on ShopSphere?",
      answer:
        "Yes, you can register as an admin on ShopSphere to manage and sell your own products. The admin panel allows you to manage inventory, add or edit product details, and track sales efficiently.",
    },
    {
      question: "Is it easy to find products on ShopSphere?",
      answer:
        "Absolutely! You can use the search and filter functionalities to quickly find the products you need, whether you’re searching by category, price, or specific features.",
    },
  ];

  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-6">
        Frequently Asked Questions
      </h1>

      <div className="w-full max-w-3xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 bg-gray-800 shadow rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-5 text-left text-white text-lg font-semibold hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 focus:outline-none"
            >
              <span>{faq.question}</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="px-6 py-5 text-gray-300 text-lg border-t border-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
