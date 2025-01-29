import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { TruckIcon, ArrowPathIcon, CurrencyDollarIcon, QueueListIcon } from '@heroicons/react/24/outline';

const Shipping = () => {
  const { isDarkMode } = useTheme();

  const policies = [
    {
      title: "Returns Policy",
      icon: <ArrowPathIcon className="w-8 h-8" />,
      items: [
        "30-day return window from delivery date",
        "Items must be unused in original packaging",
        "Customer covers return shipping unless defective",
        "Final sale items cannot be returned"
      ]
    },
    {
      title: "Refund Policy",
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      items: [
        "Refunds processed within 5-7 business days",
        "Original payment method refunds",
        "Non-refundable shipping costs (except defects)",
        "Store credit available for receipt-less returns"
      ]
    },
    {
      title: "Shipping Information",
      icon: <TruckIcon className="w-8 h-8" />,
      items: [
        "Standard shipping: 5-7 business days",
        "Express shipping: 2-3 business days",
        "Free shipping on orders over $50",
        "International shipping available"
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-[#0d1321] to-[#1a2336]' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="px-4 py-4 sm:py-6">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r ${isDarkMode
                ? 'from-violet-400 via-fuchsia-400 to-pink-400'
                : 'from-violet-600 via-fuchsia-600 to-pink-600'
              } bg-clip-text text-transparent mb-4 leading-normal sm:leading-normal md:leading-normal`}>
              Shipping & Returns
            </h1>
          </div>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto`}>
            Transparent policies for a stress-free shopping experience. We've got you covered from checkout to delivery.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {policies.map((policy, index) => (
            <div
              key={index}
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 ${isDarkMode
                  ? 'bg-gradient-to-br from-[#1b2743] to-[#2a3655] hover:shadow-xl hover:shadow-violet-900/20'
                  : 'bg-white hover:shadow-xl hover:shadow-violet-100'
                } transform hover:-translate-y-2 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${isDarkMode
                  ? 'bg-violet-900/30 text-violet-400'
                  : 'bg-violet-100 text-violet-600'
                }`}>
                {policy.icon}
              </div>
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-violet-300' : 'text-gray-800'}`}>
                {policy.title}
              </h2>
              <ul className="space-y-3">
                {policy.items.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-start ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    <span className={`mr-2 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl ${isDarkMode
            ? 'bg-gradient-to-br from-[#1b2743] to-[#2a3655] shadow-lg shadow-violet-900/10'
            : 'bg-white shadow-xl shadow-violet-100/50'
          } animate-fade-in-up`}>
          <div className="flex items-center mb-6">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 ${isDarkMode
                ? 'bg-pink-900/30 text-pink-400'
                : 'bg-pink-100 text-pink-600'
              }`}>
              <QueueListIcon className="w-8 h-8" />
            </div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-pink-300' : 'text-gray-800'}`}>
              Return Process
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Login to your account",
              "Navigate to order history",
              "Select item to return",
              "Complete return form",
              "Print shipping label",
              "Package and ship item"
            ].map((step, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-xl ${isDarkMode
                    ? 'bg-[#0d1321] hover:bg-[#141b2d]'
                    : 'bg-gray-50 hover:bg-gray-100'
                  } transition-colors duration-300`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${isDarkMode
                    ? 'bg-pink-900/30 text-pink-400'
                    : 'bg-pink-100 text-pink-600'
                  }`}>
                  {index + 1}
                </div>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`text-center mt-20 p-6 sm:p-8 rounded-2xl ${isDarkMode
            ? 'bg-gradient-to-br from-[#1b2743] to-[#2a3655] shadow-lg shadow-violet-900/10'
            : 'bg-white shadow-xl shadow-violet-100/50'
          } animate-fade-in-up max-w-3xl mx-auto`}>
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Need More Help?
          </h3>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Our support team is here to assist you
          </p>
          <a
            href="mailto:support@example.com"
            className={`inline-flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 ${isDarkMode
                ? 'bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white'
                : 'bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white'
              } shadow-lg hover:shadow-xl`}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Shipping;