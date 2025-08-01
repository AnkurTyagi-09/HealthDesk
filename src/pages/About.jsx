import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      className="min-h-screen max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-20 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.div 
        className="relative text-center z-10"
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
          ABOUT <span className="text-blue-600">US</span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
          Simplifying healthcare management and delivering a connected healthcare experience.
        </p>
      </motion.div>

      {/* About Content */}
      <div className="relative my-16 flex flex-col md:flex-row gap-12 items-center z-10">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="w-full md:max-w-[400px] rounded-xl shadow-xl border-4 border-blue-100/30 hover:scale-105 transition-transform duration-300 ease-in-out"
          src={assets.about_image}
          alt="About HealthDesk"
          loading="lazy"
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="flex flex-col justify-center gap-8 md:w-2/4 text-gray-700 text-base leading-relaxed"
        >
          <p>
            Welcome to <span className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">HealthDesk</span>, your reliable companion in simplifying healthcare management. At HealthDesk, we understand the challenges of booking doctor appointments and organizing medical information.
          </p>
          <p>
            We are dedicated to advancing healthcare technology and improving our platform continuously. Whether it’s your first appointment or routine health management, HealthDesk is here to assist you every step of the way.
          </p>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p>
              To deliver a smooth and connected healthcare experience for all. We strive to bridge the gap between patients and healthcare professionals, ensuring you receive timely and accessible medical care.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <motion.div 
        className="relative text-center mb-12 z-10"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 tracking-tight">
          WHY <span className="text-blue-600">CHOOSE US</span>
        </h3>
      </motion.div>

      <motion.div 
        className="relative grid gap-8 md:grid-cols-3 z-10"
        initial="hidden" animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {[
          { title: "EFFICIENCY", desc: "Simplified appointment booking designed to match your fast-paced lifestyle." },
          { title: "CONVENIENCE", desc: "Seamless access to a trusted network of healthcare professionals near you." },
          { title: "PERSONALIZATION", desc: "Customized recommendations and timely reminders to keep your health on track." }
        ].map((item) => (
          <motion.div
            key={item.title}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="border border-blue-100/50 rounded-xl px-10 py-12 flex flex-col gap-5 text-gray-600 bg-white/95 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 hover:text-white hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
          >
            <b className="text-lg font-semibold">{item.title}</b>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default About;
