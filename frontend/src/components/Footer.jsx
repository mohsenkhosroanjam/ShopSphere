import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* About Us Section */}
        <div>
          <h4 className="text-xl font-semibold mb-4">About Us</h4>
          <p className="text-sm text-gray-300">
            We are committed to providing the best products at affordable
            prices. Your satisfaction is our priority.
          </p>
        </div>

        {/* Customer Service Section */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <a href="/help" className="text-gray-300 hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="/returns" className="text-gray-300 hover:text-white">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="/shipping" className="text-gray-300 hover:text-white">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-300 hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/products" className="text-gray-300 hover:text-white">
                Shop All Products
              </a>
            </li>
            <li>
              <a href="/offers" className="text-gray-300 hover:text-white">
                Offers
              </a>
            </li>
            <li>
              <a href="/blog" className="text-gray-300 hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="/faq" className="text-gray-300 hover:text-white">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
        <div className="flex space-x-4">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
    <FontAwesomeIcon
      icon={faFacebookF}
      className="text-gray-300 text-xl transition-transform duration-300 hover:scale-125 hover:text-blue-600"
    />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
    <FontAwesomeIcon
      icon={faTwitter}
      className="text-gray-300 text-xl transition-transform duration-300 hover:scale-125 hover:text-blue-400"
    />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
    <FontAwesomeIcon
      icon={faInstagram}
      className="text-gray-300 text-xl transition-transform duration-300 hover:scale-125 hover:text-orange-700"
    />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <FontAwesomeIcon
      icon={faLinkedinIn}
      className="text-gray-300 text-xl transition-transform duration-300 hover:scale-125 hover:text-blue-500"
    />
  </a>
</div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} E-Commerce Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
