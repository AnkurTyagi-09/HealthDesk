import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-600 to-teal-400 pt-24">
      <div className="flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20 max-w-[1440px] mx-auto">

        {/* Left Side */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[10vw]"
        >
          <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight tracking-tight">
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 text-white text-sm font-medium">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={assets.group_profiles}
              alt="Group of doctors"
              loading="lazy"
              className="w-32 mb-2 rounded-lg shadow-md"
            />
            <p className="text-gray-100">
              Simply browse through our extensive list of trusted doctors, <br className="hidden sm:block" />
              schedule your appointment hassle-free.
            </p>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#speciality"
            aria-label="Book Appointment"
            className="flex items-center bg-coral-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-coral-600 transition-all"
          >
            Book Appointment
            <img src={assets.arrow_icon} alt="Arrow icon" className="ml-2 w-4" loading="lazy" />
          </motion.a>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 relative flex items-end justify-center"
        >
          <img
            className="w-full md:absolute bottom-0 h-auto rounded-xl shadow-xl border-4 border-white/20"
            src={assets.header_img}
            alt="Doctor Consultation"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Header;
