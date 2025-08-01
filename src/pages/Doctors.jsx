import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <motion.div
      className="pt-20 min-h-screen bg-[#f6faff] px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row gap-4">
        {/* Mobile Filter Dropdown */}
        <div className="sm:hidden mb-4">
          <button
            className={`py-3 px-4 border rounded-lg text-base font-medium w-full transition ${showFilter ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setShowFilter(prev => !prev)}
          >
            Select Speciality
          </button>
          {showFilter && (
            <div className="mt-2 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {specialities.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    navigate(speciality === item ? '/doctors' : `/doctors/${item}`);
                    setShowFilter(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-base rounded-md transition
                    ${speciality === item
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'bg-white hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <motion.aside
          className="w-[180px] hidden sm:block mt-2 flex-shrink-0"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-gray-700 text-base font-medium mb-3">Browse by specialty</p>
          <div className="flex flex-col gap-2">
            {specialities.map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(speciality === item ? '/doctors' : `/doctors/${item}`)}
                className={`w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm transition
                  ${speciality === item
                    ? 'bg-[#e2e8ff] text-black font-medium'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        </motion.aside>

        {/* Doctors Grid */}
        <motion.section
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="cursor-pointer bg-white rounded-lg border border-gray-200 transition hover:shadow-md overflow-hidden"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full object-cover aspect-[4/3] sm:h-60"
                />
                <div className="p-3">
                  <div className="flex items-center gap-2 text-green-600 text-xs mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Available</span>
                  </div>
                  <p className="text-base font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.speciality}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No doctors found for this specialty.</p>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Doctors;