import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    if (!email) {
      toast.error("please enter a valid email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate the email before submitting the form
    if (!validateEmail(email)) {
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className={`${
        isDarkMode
          ? "bg-gradient-to-t from-gray-900 to-gray-800"
          : "bg-gradient-to-t from-gray-100 to-white"
      } ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
    >
      <div className="container mx-auto px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4
              className={`text-lg font-bold ${
                isDarkMode ? "text-rose-400" : "text-rose-500"
              }`}
            >
              ShopSphere
            </h4>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } leading-relaxed`}
            >
              Elevating your shopping experience with curated fashion that
              speaks your style.
            </p>
            <div
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } hover:text-rose-500 transition-colors duration-200`}
            >
              <Link to="/termsAndConditions">Terms and Conditions</Link>
            </div>
            <div className="flex space-x-5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-block transition-all duration-300 ease-in-out 
  hover:scale-125 hover:rotate-[15deg] hover:shadow-2xl hover:translate-y-[-4px] 
  hover:skew-x-3 hover:skew-y-3 hover:brightness-125 hover:contrast-125"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className={`${
                    isDarkMode ? "text-rose-400" : "text-rose-500"
                  } text-xl hover:text-rose-600 transition-colors duration-300`}
                />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-block transition-all duration-300 ease-in-out 
  hover:scale-125 hover:rotate-[15deg] hover:shadow-2xl hover:translate-y-[-4px] 
  hover:skew-x-3 hover:skew-y-3 hover:brightness-125 hover:contrast-125"
              >
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className={`${
                    isDarkMode ? "text-rose-400" : "text-rose-500"
                  } text-xl hover:text-rose-600 transition-all duration-300 hover:scale-110`}
                />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-block transition-all duration-300 ease-in-out 
  hover:scale-125 hover:rotate-[15deg] hover:shadow-2xl hover:translate-y-[-4px] 
  hover:skew-x-3 hover:skew-y-3 hover:brightness-125 hover:contrast-125"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className={`${
                    isDarkMode ? "text-rose-400" : "text-rose-500"
                  } text-xl hover:text-rose-600 transition-all duration-300 hover:scale-110`}
                />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-block transition-all duration-300 ease-in-out 
  hover:scale-125 hover:rotate-[15deg] hover:shadow-2xl hover:translate-y-[-4px] 
  hover:skew-x-3 hover:skew-y-3 hover:brightness-125 hover:contrast-125"
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className={`${
                    isDarkMode ? "text-rose-400" : "text-rose-500"
                  } text-xl hover:text-rose-600 transition-all duration-300 hover:scale-110`}
                />
              </a>
            </div>
          </div>

          <div className="space-y-3 col-span-2 flex justify-center gap-8">
            <div className="grid grid-cols-2 gap-8">
               
              <ul className="space-y-3">
                {[
                  { href: "/help", label: "Help Center" },
                  { href: "/returns", label: "Returns & Refunds" },
                  { href: "/shipping", label: "Shipping Info" },
                  { href: "/contact", label: "Contact Us" },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`relative text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } 
        hover:text-rose-500 transition-colors duration-200 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2.5px] 
        after:bg-rose-500 after:transition-all after:duration-300 hover:after:w-full`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              
              <ul className="space-y-3">
                {[
                  { to: "/shop", label: "Shop All Products" },
                  { to: "/offers", label: "Offers" },
                  { to: "/blog", label: "Blog" },
                  { to: "/faq", label: "FAQs" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className={`relative text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } 
        hover:text-rose-500 transition-colors duration-200 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2.5px] 
        after:bg-rose-500 after:transition-all after:duration-300 hover:after:w-full`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4
              className={`text-lg font-bold ${
                isDarkMode ? "text-rose-400" : "text-rose-500"
              }`}
            >
              Stay Updated!
            </h4>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Subscribe for exclusive deals and updates!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
            
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg border border-transparent outline-none 
     transition-all duration-300 ease-in-out peer
     ${
       isDarkMode
         ? "bg-gray-800 text-white focus:border-rose-500"
         : "bg-gray-100 text-gray-900 focus:border-rose-500"
     } 
     focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50 
     shadow-md focus:shadow-lg focus:shadow-rose-500/50`}
              />

           
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full relative overflow-hidden group ${
                  isDarkMode
                    ? "bg-rose-500 hover:bg-rose-600"
                    : "bg-rose-600 hover:bg-rose-700"
                } text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out 
     disabled:opacity-70 disabled:cursor-not-allowed 
     hover:scale-105 active:scale-95 
     shadow-lg shadow-rose-800/50 hover:shadow-rose-900/70`}
              >
                <span className="absolute inset-0 bg-white opacity-10 transition-all duration-300 group-hover:opacity-20"></span>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div
          className={`text-center text-xs ${
            isDarkMode ? "text-gray-500" : "text-gray-600"
          } mt-4`}
        >
          © {new Date().getFullYear()} ShopSphere, All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
