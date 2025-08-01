import React, { useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-01",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewImage(ev.target.result);
        setUserData((prev) => ({ ...prev, image: ev.target.result }));
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!userData.name || !userData.email || !userData.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsEdit(false);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-100 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl space-y-6"
        aria-labelledby="profile-heading"
      >
        {/* Heading */}
        <h1 id="profile-heading" className="text-3xl font-bold text-gray-800 text-center">
          Your Patient Profile
        </h1>

        {/* Error Feedback */}
        {error && (
          <p className="text-red-600 text-sm text-center" role="alert">
            {error}
          </p>
        )}

        {/* Profile Image */}
        <div className="flex flex-col items-center mt-10">
          <div className="relative">
            <img
              className="w-48 h-48 rounded-full object-cover shadow-lg"
              src={previewImage || userData.image}
              alt={`${userData.name}'s profile picture`}
            />
            {isEdit && (
              <label className="absolute bottom-2 right-2 bg-blue-700 text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-blue-800 transition-all">
                Change
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          {isEdit ? (
            <input
              className="bg-gray-50 text-2xl font-medium mt-4 text-center border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              aria-label="Full name"
              required
            />
          ) : (
            <p className="font-medium text-2xl text-gray-800 mt-4">{userData.name}</p>
          )}
        </div>

        {/* Contact Information */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <p className="text-gray-600 font-medium underline mt-6">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-4 mt-4 text-gray-700">
            <p className="font-medium">Email:</p>
            {isEdit ? (
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                aria-label="Email address"
                required
              />
            ) : (
              <p className="text-blue-600 break-all">{userData.email}</p>
            )}

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                aria-label="Phone number"
                required
              />
            ) : (
              <p className="text-blue-600">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <input
                  className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  type="text"
                  aria-label="Address line 1"
                />
                <input
                  className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                  aria-label="Address line 2"
                />
              </div>
            ) : (
              <p className="text-gray-600">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </motion.div>

        {/* Basic Information */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <p className="text-gray-600 font-medium underline mt-6">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-4 mt-4 text-gray-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
                aria-label="Gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}

            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
                aria-label="Date of birth"
                required
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-8 text-center">
          {isEdit ? (
            <button
              className="bg-blue-700 text-white px-8 py-2 rounded-full hover:bg-blue-800 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onClick={handleSave}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-blue-700 text-white px-8 py-2 rounded-full hover:bg-blue-800 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </motion.div>

        {/* Trust Signal */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="text-center text-sm text-gray-600 mt-4">
          Your data is securely stored in compliance with healthcare regulations.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default MyProfile;
