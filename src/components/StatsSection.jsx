
import React, { memo } from 'react';

const StatsSection = () => {
  const stats = [
    { number: '10,000+', label: 'Appointments Booked' },
    { number: '500+', label: 'Verified Doctors' },
    { number: '95%', label: 'Patient Satisfaction' },
    { number: '12+', label: 'Cities Served' },
  ];

  return (
    <section
      className="w-full bg-white py-16 px-6 sm:px-10 md:px-14"
      role="region"
      aria-label="Statistics overview"
    >
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 leading-tight tracking-tight">
          Trusted by Thousands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-full shadow-md hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-3xl font-extrabold text-blue-600">{item.number}</h3>
              <p className="mt-2 text-gray-700 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(StatsSection);
