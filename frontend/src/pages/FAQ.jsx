import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Scrollbtn from "../components/scrollbtn";

const FAQ = () => {
  const {isDarkMode} = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "What features does ShopSphere offer for product browsing?",
      answer: "ShopSphere provides an intuitive interface for browsing products with detailed information including prices, descriptions, and customer reviews. Our advanced search and filter system helps you find exactly what you're looking for by category, price range, or specific features."
    },
    {
      question: "How secure is my personal information on ShopSphere?",
      answer: "We prioritize your security with encrypted user authentication and secure data storage. Your payment information is protected through our integrated secure payment gateway, ensuring safe and hassle-free transactions every time you shop."
    },
    {
      question: "How can I track my orders and manage returns?",
      answer: "Through your user dashboard, you can view your complete order history, track current orders in real-time, and initiate returns when needed. Our order management system provides detailed updates at every step of the delivery process."
    },
    {
      question: "What features are available for sellers on ShopSphere?",
      answer: "Sellers have access to a comprehensive admin panel that enables full product management, inventory tracking, and sales analytics. You can easily add new products, update existing listings, manage stock levels, and track your business performance through detailed reports."
    },
    {
      question: "Can I use ShopSphere on my mobile device?",
      answer: "Absolutely! ShopSphere is fully responsive and optimized for all screen sizes. Whether you're shopping on a desktop, tablet, or smartphone, you'll enjoy the same seamless experience with all features accessible across devices."
    },
    {
      question: "How does the shopping cart system work?",
      answer: "Our real-time shopping cart system allows you to add products, adjust quantities, and remove items instantly. The cart automatically saves your selections, calculates totals, and persists across sessions, making it easy to resume shopping at any time."
    }
  ];

  return (
    <>
    <Scrollbtn />
    <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} min-h-screen flex flex-col items-center p-6`}>
      <h1 className={`text-4xl font-bold mb-20`}>
        <span className={`${isDarkMode ? "text-pink-500" : "text-pink-500"}`}>F</span>requently
        <span className={`${isDarkMode ? "text-pink-500" : "text-pink-500"}`}> A</span>sked
        <span className={`${isDarkMode ? "text-pink-500" : "text-pink-500"}`}> Q</span>uestions
      </h1>

      <div className="w-full max-w-4xl px-10">
        {faqs.map((faq, index) => (
          <div
          key={index}
          className={`mb-5 rounded-xl overflow-hidden border transition-transform duration-300 ${
            isDarkMode
              ? "bg-gray-800 border-gray-800 hover:border-gray-600"
              : "bg-gray-100 border-white hover:border-gray-500"
          } ${activeIndex === index ? "!border-pink-500" : ""} border hover:border-pink-500 hover:-translate-y-3 hover:shadow-lg`}
        >
            <div
              className="flex justify-between items-center px-8 py-6 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className={`${isDarkMode ? "text-white" : "text-black"} text-lg font-bold flex-1`}>{faq.question}</h2>
              <span className={`${isDarkMode ? "text-white" : "text-black"} text-2xl font-bold mx-4`}>
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            <div
              className={`transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className={`${isDarkMode ? "text-gray-300 border-gray-700" : "text-gray-900 border-gray-300"} px-8 py-6 text-lg border-t`}>
              {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default FAQ;
