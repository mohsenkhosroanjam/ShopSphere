import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebookF,faTwitter,faInstagram,faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#000000] to-[#0F172A] text-gray-200">
      <div className="container mx-auto px-8 pl-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-[#EC4899]">ShopSphere</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Elevating your shopping experience with  <br /> curated fashion that speaks your style.
            </p>
            <div className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
              <Link to='/termsAndConditions'>Terms and Condition</Link>
            </div>
            <div className="flex space-x-5 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="text-[#EC4899] text-xl hover:text-[#bd799b] transition-all duration-300 hover:scale-110"
                />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-[#EC4899] text-xl hover:text-[#bd799b] transition-all duration-300 hover:scale-110"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-[#EC4899] text-xl hover:text-[#bd799b] transition-all duration-300 hover:scale-110"
                />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="text-[#EC4899] text-xl hover:text-[#bd799b] transition-all duration-300 hover:scale-110"
                />
              </a>
            </div>
          </div>

          <div className="space-y-3 -ml-6">
            <ul className="space-y-3">
              <li>
                <a href="/help" className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/returns" className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 -ml-6">
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-gray-400 hover:text-[#EC4899] transition-colors duration-200">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4 pt-8">
          © {new Date().getFullYear()} ShopSphere, All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;