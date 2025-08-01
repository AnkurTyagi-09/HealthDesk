import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation(); // For checking current path

  return (
    <div className="flex flex-col min-h-screen">
      {/* Always show navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow pt-24 mx-4 sm:mx-[10%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* Hide Footer on login page */}
      {location.pathname !== "/login" && location.pathname !== "/my-profile" && location.pathname !== "/my-appointments" && <Footer />}
    </div>
  );
};

export default App;
