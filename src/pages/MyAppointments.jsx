import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const MyAppointments = () => {
  const { appointments, setAppointments, uploadingId, uploadProgress } = useContext(AppContext);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    console.log("MyAppointments mounted, current appointments:", appointments);
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    console.log("Appointments updated in MyAppointments:", appointments);
  }, [appointments]);

  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      console.log("Cancelling appointment ID:", appointmentId);
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white/90 backdrop-blur-md py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-medium tracking-tight text-gray-800 border-b border-blue-100 pb-3"
        >
          My Appointments
        </motion.h2>

        <div className="grid gap-6 mt-6">
          {appointments.length === 0 ? (
            <p className="text-gray-600 text-center">No appointments booked yet.</p>
          ) : (
            appointments.map((item, index) => (
              <motion.div
                key={item.id}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
                variants={cardVariants}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-white/95 shadow-sm rounded-xl border border-blue-100 hover:shadow-lg transition-shadow duration-300"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  className="w-32 h-32 rounded-full object-cover border-2 border-blue-100"
                  src={item.image || assets.default_doctor_image}
                  alt={`${item.name || "Doctor"}, ${item.speciality || "General"} specialist`}
                />

                <div className="flex-1 text-sm text-gray-600">
                  <h3 className="text-lg font-medium tracking-tight text-gray-800">
                    {item.name || "Unknown Doctor"}
                  </h3>
                  <p className="text-blue-600 font-medium">{item.speciality || "General"}</p>
                  <div className="mt-3">
                    <p className="font-medium text-gray-700">Address:</p>
                    <p className="text-sm">{item.address?.line1 || "Unknown"}</p>
                    <p className="text-sm">{item.address?.line2 || "Unknown"}</p>
                  </div>
                  <p className="text-gray-700 font-medium mt-3">
                    Appointment Date & Time:{" "}
                    <span className="font-normal">
                      {item.datetime
                        ? new Date(item.datetime).toLocaleDateString([], {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Unknown"}{" "}
                      |{" "}
                      {item.datetime
                        ? new Date(item.datetime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Unknown"}
                    </span>
                  </p>

                  {/* --- MODIFIED VIDEO STATUS --- */}
                  <p className="text-gray-700 font-medium mt-3">
                    Symptom Video:{" "}
                    {item.uploadStatus === "Uploading" && item.id === uploadingId ? (
                      <span className="text-gray-500">Uploading... {uploadProgress}%</span>
                    ) : item.uploadStatus === "Uploaded" && item.videoUrl ? (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        View Video
                      </a>
                    ) : (
                      <span className="text-gray-500">No video uploaded</span>
                    )}
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-teal-500 transition-all focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    Pay Online
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full text-red-600 border border-red-600 hover:bg-red-600 hover:text-white transition-all focus:ring-2 focus:ring-red-600 focus:outline-none"
                    onClick={() => handleCancel(item.id)}
                  >
                    Cancel Appointment
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-gray-600 mt-8"
        >
          Manage your appointments securely with HealthCare Hospital. Accredited by NABH and JCI.
        </motion.p>
      </div>
    </div>
  );
};

export default MyAppointments;
