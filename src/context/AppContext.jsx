import { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [appointments, setAppointments] = useState([]);

  // --- NEW STATES FOR UPLOAD TRACKING ---
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load appointments from local storage
  useEffect(() => {
    console.log("Loading appointments from local storage");
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(storedAppointments);
  }, []);

  // Sync appointments to local storage
  useEffect(() => {
    console.log("Saving appointments to local storage:", appointments);
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const value = {
    doctors,
    currencySymbol,
    appointments,
    setAppointments,
    uploadingId,
    setUploadingId,
    uploadProgress,
    setUploadProgress,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
