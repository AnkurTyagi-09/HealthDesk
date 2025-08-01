import React from 'react';
import { assets } from '../assets/assets';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* Top Content */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20 mb-10">
          
          {/* Brand Section */}
          <div className="flex-shrink-0 max-w-md">
            <img
              className="w-40 mb-4"
              src={assets.logo}
              alt="HealthDesk logo"
              loading="lazy"
            />
            <p className="leading-6 text-gray-600">
              HealthDesk connects you with trusted doctors and simplifies your healthcare journey 
              through smart, secure, and seamless appointments.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6 text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              {['Home', 'About Us', 'Services', 'Contact'].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-blue-600 transition-colors relative group"
                  >
                    {link}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Get in Touch</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="font-semibold">Email:</span>{' '}
                <a
                  href="mailto:support@healthdesk.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  support@healthdesk.com
                </a>
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{' '}
                <a
                  href="tel:+919876543210"
                  className="hover:text-blue-600 transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li>
                <span className="font-semibold">Location:</span> New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300" />

        {/* Bottom Text */}
        <p className="text-center py-5 text-sm text-gray-500">
          © {new Date().getFullYear()} HealthDesk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
