import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-b from-white to-blue-100">
      
      {/* Emergency Banner - Slightly Down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-red-600 text-white text-center py-3 px-4 rounded-lg shadow-md mb-8 mt-4" 
        role="alert"
      >
        <p className="text-sm font-medium">
          Emergency Helpline: 
          <a href="tel:+911234567890" className="underline ml-1 hover:text-gray-200">
            +91 12345 67890
          </a>
        </p>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 pt-8"
      >
        <h1>
          CONTACT <span className="text-blue-700">US</span>
        </h1>
      </motion.div>

      {/* Content */}
      <div className="mt-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 w-full"
        >
          <img
            src={assets.contact_image}
            alt="HealthDesk Hospital Facility"
            className="rounded-xl shadow-xl w-full object-cover max-h-[400px] hover:scale-105 transition-transform duration-300 ease-in-out"
            loading="lazy"
          />
          <p className="text-center text-sm text-gray-500 mt-2">
            Our state-of-the-art hospital facility
          </p>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 space-y-6 text-gray-700 text-base"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              OUR OFFICE
            </h2>
            <p className="font-medium">HealthDesk Technologies Pvt. Ltd.</p>
            <p>2nd Floor, Cyber Park, Sector 62, Noida, Uttar Pradesh, India – 201309</p>
            <p className="mt-2">
              <span className="font-semibold">Tel:</span>{" "}
              <a href="tel:+919876543210" className="hover:text-blue-700 transition-colors">
                +91 98765 43210
              </a>
              <br />
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:support@healthdesk.com" className="hover:text-blue-700 transition-colors">
                support@healthdesk.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              GLOBAL PRESENCE
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>United States: 1234 Willms Station, Suite 200, Washington, USA</li>
              <li>United Kingdom: 21 Baker Street, London, UK</li>
              <li>Singapore: 88 Market Street, Singapore 048948</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              CAREERS AT HEALTHDESK
            </h2>
            <p>
              Be part of our growing team. Explore opportunities across engineering,
              product design, and customer success to shape the future of connected healthcare.
            </p>
            <a
              href="#"
              className="mt-4 inline-block px-6 py-2 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Explore career opportunities at HealthDesk"
            >
              Explore Jobs
            </a>
          </div>
        </motion.div>
      </div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 text-center text-gray-600 text-sm"
      >
        <p>Accredited by NABH and JCI | Committed to Excellence in Patient Care</p>
      </motion.div>
    </div>
  );
};

export default Contact;
