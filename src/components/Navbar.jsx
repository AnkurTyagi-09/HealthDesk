import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'HOME' },
  { path: '/doctors', label: 'ALL DOCTORS' },
  { path: '/about', label: 'ABOUT' },
  { path: '/contact', label: 'CONTACT' }
];

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-[11000] flex justify-between items-center 
                 text-sm bg-white shadow-md px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32"
    >
      {/* Logo */}
      <motion.img
        whileHover={{ scale: 1.05 }}
        src={assets.logo}
        alt="Health Desk Logo"
        className="w-32 sm:w-40 cursor-pointer h-auto"
        onClick={() => navigate('/')}
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-10 font-medium text-gray-800">
        {navLinks.map(({ path, label }) => (
          <motion.li key={path} whileHover={{ scale: 1.1 }} className="py-2">
            <NavLink
              to={path}
              className="relative text-base hover:text-blue-600 transition-colors duration-300 
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 
                        after:h-[2px] after:bg-teal-400 after:transition-all after:duration-300 
                        hover:after:w-full"
            >
              {label}
            </NavLink>
          </motion.li>
        ))}
      </ul>

      {/* Profile / Auth Section */}
      <div className="flex items-center gap-4">
        {token ? (
          <>
            {/* Profile Dropdown Toggle */}
            <div className="relative cursor-pointer flex items-center gap-2" onClick={() => setShowDropdown(prev => !prev)}>
              <motion.img
                whileHover={{ scale: 1.1 }}
                className="w-9 rounded-full border-2 border-blue-200 p-0.5"
                src={assets.profile_pic}
                alt="Profile"
              />
              <img
                className={`w-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                src={assets.dropdown_icon}
                alt="Dropdown"
              />

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 min-w-52 
                               bg-white rounded-xl flex flex-col gap-3 p-5 
                               shadow-lg border border-blue-100"
                  >
                    <p onClick={() => { setShowDropdown(false); navigate('my-profile'); }}
                       className="hover:text-blue-600 hover:bg-teal-50 px-3 py-2 rounded-md cursor-pointer">
                      My Profile
                    </p>
                    <p onClick={() => { setShowDropdown(false); navigate('my-appointments'); }}
                       className="hover:text-blue-600 hover:bg-teal-50 px-3 py-2 rounded-md cursor-pointer">
                      My Appointments
                    </p>
                    <p onClick={() => { setToken(false); setShowDropdown(false); }}
                       className="hover:text-blue-600 hover:bg-teal-50 px-3 py-2 rounded-md cursor-pointer">
                      Logout
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.img
              whileHover={{ scale: 1.1 }}
              onClick={() => setShowMenu(true)}
              className="w-8 h-8 md:hidden cursor-pointer"
              src={assets.menu_icon}
              alt="Menu Icon"
            />

            {/* Mobile Menu */}
            <AnimatePresence>
              {showMenu && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/60 z-[11001]"
                    onClick={() => setShowMenu(false)}
                  />
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                    className="fixed top-0 right-0 w-4/5 max-w-[300px] h-full 
                               bg-white border-l border-blue-200 shadow-2xl z-[11002]"
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b">
                      <img className="w-28" src={assets.logo} alt="Health Desk Logo" />
                      <img
                        className="w-5 cursor-pointer"
                        onClick={() => setShowMenu(false)}
                        src={assets.cross_icon}
                        alt="Close Icon"
                      />
                    </div>
                    <ul className="flex flex-col gap-2 mt-4 px-5 text-base font-medium text-gray-800">
                      {navLinks.map(({ path, label }) => (
                        <NavLink
                          key={path}
                          onClick={() => setShowMenu(false)}
                          to={path}
                          className="block px-4 py-3 rounded-lg hover:bg-teal-50 hover:text-blue-600 transition-colors"
                        >
                          {label}
                        </NavLink>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium 
                       hover:bg-teal-500 transition-colors duration-300 text-xs sm:text-sm"
          >
            Create Account
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;