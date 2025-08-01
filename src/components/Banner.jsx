
import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Banner = () => {
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section
      className="w-full bg-gradient-to-r from-blue-600 to-teal-400 py-20 px-6 sm:px-10 md:px-16 my-20 rounded-2xl shadow-xl"
      role="region"
      aria-label="Doctor appointment promotion"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side Text */}
        <div className="md:w-1/2 flex flex-col gap-6 text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
            Simplify Your Healthcare
          </h2>
          <p
            className="text-white/90 text-lg max-w-md"
            id="banner-description"
          >
            Skip the long queues and connect with trusted doctors instantly. Book appointments anytime, anywhere — all from one place.
          </p>
          <Link
            to="/login"
            onClick={handleClick}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-blue-600 font-semibold shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/40"
            aria-describedby="banner-description"
          >
            Create Account
            <img
              src={assets.arrow_icon}
              alt="Arrow icon"
              className="w-4 transition-transform duration-300 group-hover:translate-x-1"
              loading="eager"
            />
          </Link>
        </div>

        {/* Right Side Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.appointment_img}
            alt="Doctor appointment illustration"
            className="w-full max-w-[500px] rounded-2xl border-4 border-white/20 shadow-2xl hover:scale-[1.02] transition-transform duration-300"
            loading="eager"
            role="img"
          />
        </div>
      </div>
    </section>
  );
};

export default memo(Banner);
