import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";

// ---- AI Symptom Question Bank ----
const getAIQuestions = (symptoms = ["fever", "cough"]) => {
  const map = {
    fever: [
      "How high has your temperature been?",
      "Do you experience chills or sweating?",
    ],
    cough: ["Is it dry or wet?", "How long have you been coughing?"],
  };
  const base = ["Can you describe your overall symptoms?"];
  let questions = [...base];
  symptoms.forEach((s) => (map[s] ? (questions = [...questions, ...map[s]]) : null));
  return questions.length > 0 ? questions : base;
};

// ---- Custom Hook for Video Recording ----
const useVideoRecorder = (t, setDownloadUrl, setRecordingSaved, setUploadProgress, setUploadError, onUploadComplete) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions] = useState(() => getAIQuestions());
  const [previewUrl, setPreviewUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  const speakQuestion = useCallback((text) => {
    console.log("Speaking question:", text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      console.log("Starting recording...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("Media stream obtained");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch((err) => {
          console.error("Video playback error:", err);
          throw new Error("Failed to play video stream");
        });
      }
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          console.log("Recording data received, size:", e.data.size);
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("Recording stopped, creating blob...");
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        console.log("Preview URL created:", url);
        setPreviewUrl(url);
        setRecordedBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setQuestionIndex(0);
      setRecordingTime(0);
      speakQuestion(questions[0]);

      intervalRef.current = setInterval(() => {
        setQuestionIndex((prev) => {
          const next = prev + 1 < questions.length ? prev + 1 : prev;
          speakQuestion(questions[next]);
          return next;
        });
      }, 10000);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Recording error:", err);
      setUploadError(t("appointment.recording_error") + `: ${err.message}`);
    }
  }, [questions, t, speakQuestion, setUploadError]);

  const stopRecording = useCallback(() => {
    console.log("Stopping recording...");
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    clearInterval(intervalRef.current);
    clearInterval(timerRef.current);
    setIsRecording(false);
    speechSynthesis.cancel();
  }, []);

  const uploadRecording = useCallback(() => {
    if (!recordedBlob) {
      console.error("No recorded blob available for upload");
      setUploadError(t("appointment.no_recording"));
      return;
    }
    console.log("Uploading recording, blob size:", recordedBlob.size);
    const fileRef = ref(storage, `recordings/manual-${Date.now()}.webm`);
    const uploadTask = uploadBytesResumable(fileRef, recordedBlob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
        setUploadProgress(progress);
        onUploadComplete(null, progress);
      },
      (error) => {
        console.error("Upload error:", error.code, error.message);
        setUploadError(t("appointment.upload_error") + `: ${error.message}`);
        onUploadComplete(null, 0);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Upload complete, download URL:", url);
          setDownloadUrl(url);
          setRecordingSaved(true);
          setUploadProgress(0);
          onUploadComplete(url, 0);
          setTimeout(() => setRecordingSaved(false), 3000);
        } catch (err) {
          console.error("Error getting download URL:", err);
          setUploadError(t("appointment.download_url_error") + `: ${err.message}`);
          onUploadComplete(null, 0);
        }
      }
    );
  }, [recordedBlob, t, setDownloadUrl, setRecordingSaved, setUploadProgress, setUploadError, onUploadComplete]);

  return {
    videoRef,
    isRecording,
    questionIndex,
    questions,
    recordingTime,
    previewUrl,
    startRecording,
    stopRecording,
    uploadRecording,
  };
};

// ---- Doctor Profile Component ----
const DoctorProfile = ({ docInfo, currencySymbol }) => (
  <motion.section
    className="flex flex-col gap-6 sm:flex-col lg:flex-row sm:gap-8"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex-shrink-0 w-full mx-auto sm:lg:w-80">
      <motion.img
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full rounded-2xl shadow-xl"
        src={docInfo?.image || ""}
        alt={docInfo?.name || ""}
        loading="lazy"
      />
    </div>
    <div className="flex-1 bg-white/90 rounded-2xl p-6 sm:p-8 shadow-2xl border">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
        Book Appointment with {docInfo?.name || "Doctor"}
        <img className="w-5 sm:w-6" src={assets.verified_icon} alt="Verified" />
      </h2>
      <p className="mt-2 text-sm sm:text-base text-gray-600">
        {docInfo?.degree || ""} - {docInfo?.speciality || ""}
      </p>
      <span className="inline-block py-1 px-3 bg-teal-100 text-teal-700 text-xs font-semibold rounded-full mt-2 sm:mt-3">
        {docInfo?.experience || "0"} Experience
      </span>
      <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">{docInfo?.about || ""}</p>
      <p className="text-gray-600 font-semibold mt-4 sm:mt-6 text-base sm:text-lg">
        Appointment Fee: {currencySymbol}{docInfo?.fees || "0"}
      </p>
    </div>
  </motion.section>
);

// ---- Recording Modal ----
const RecordingModal = ({
  t,
  show,
  onClose,
  isRecording,
  startRecording,
  stopRecording,
  uploadRecording,
  videoRef,
  questionIndex,
  questions,
  recordingTime,
  previewUrl,
  downloadUrl,
  doctorName,
  uploadError,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/95 rounded-2xl p-6 max-h-[90vh] w-full max-w-md overflow-y-auto shadow-xl sm:p-8 sm:max-w-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-0 flex justify-between items-center bg-white/95 z-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Record Symptoms for {doctorName || "Doctor"}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label={t("appointment.close_modal")}
              >
                &times;
              </button>
            </div>

            {uploadError && (
              <p className="mt-4 text-red-500 text-sm text-center sm:text-base" role="alert">
                {uploadError}
              </p>
            )}

            {previewUrl ? (
              <video src={previewUrl} controls className="w-full rounded-lg mt-4" />
            ) : (
              <video ref={videoRef} className="w-full rounded-lg mt-4" autoPlay muted playsInline />
            )}

            <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
              {questions?.[questionIndex] || t("appointment.recording_complete")}
            </p>
            <p className="text-xs text-gray-500 text-center mt-2 sm:text-sm">
              {t("appointment.recording_time", {
                time: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, "0")}`,
              })}
            </p>

            <div className="mt-6 flex flex-col gap-3 justify-end flex-wrap sm:flex-row">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 rounded-full text-sm active:bg-gray-300 sm:text-base sm:py-2"
                aria-label={t("appointment.cancel")}
              >
                {t("appointment.cancel")}
              </button>
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 active:bg-red-700 text-sm sm:text-base sm:py-2"
                  aria-label={t("appointment.stop_recording")}
                >
                  {t("appointment.stop_recording")}
                </button>
              ) : (
                !previewUrl && (
                  <button
                    onClick={startRecording}
                    className="px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 active:bg-teal-700 text-sm sm:text-base sm:py-2"
                    aria-label={t("appointment.start_recording")}
                  >
                    {t("appointment.start_recording")}
                  </button>
                )
              )}
              {previewUrl && (
                <button
                  onClick={uploadRecording}
                  className="px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 active:bg-teal-700 text-sm sm:text-base sm:py-2"
                  aria-label={t("appointment.upload_recording")}
                >
                  {t("appointment.upload_recording")}
                </button>
              )}
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 active:bg-blue-800 text-sm sm:text-base sm:py-2"
                  aria-label={t("appointment.download_recording")}
                >
                  {t("appointment.download_recording")}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---- Booking Modal ----
const BookingModal = ({ t, show, onClose, slotTime, docInfo, currencySymbol, i18n, downloadUrl, docSlots, slotIndex, navigate, saveAppointment, uploadProgress }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white/95 rounded-2xl p-6 max-h-[90vh] w-full max-w-md overflow-y-auto shadow-xl sm:p-8 sm:max-w-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-0 flex justify-between items-center bg-white/95 z-10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                Book Appointment with {docInfo?.name || "Doctor"}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label={t("appointment.close_modal")}
              >
                &times;
              </button>
            </div>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">
              Confirm appointment with {docInfo?.name || "Doctor"} at {slotTime} on{" "}
              {docInfo && docSlots[slotIndex]?.length > 0
                ? new Date(docSlots[slotIndex][0].datetime).toLocaleDateString(i18n.language)
                : ""}
            </p>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Appointment Fee: {currencySymbol}{docInfo?.fees || "0"}
            </p>
            {downloadUrl && (
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Symptom Video: <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">View Uploaded Video</a>
              </p>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Video uploading: {Math.round(uploadProgress)}%
              </p>
            )}
            <div className="mt-6 flex flex-col gap-3 justify-end sm:flex-row">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 rounded-full text-sm active:bg-gray-300 sm:text-base sm:py-2"
                aria-label={t("appointment.cancel")}
              >
                {t("appointment.cancel")}
              </button>
              <button
                onClick={() => {
                  console.log("Confirming appointment with videoUrl:", downloadUrl);
                  saveAppointment(downloadUrl);
                  onClose();
                  navigate("/my-appointments");
                }}
                disabled={uploadProgress > 0}
                className={`px-6 py-3 rounded-full font-semibold text-sm sm:text-base sm:py-2 ${
                  uploadProgress > 0 ? "bg-gray-300 text-gray-500" : "bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700"
                }`}
                aria-label={t("appointment.confirm_appointment")}
              >
                Confirm Appointment
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ---- Main Appointment Component ----
const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, appointments, setAppointments } = useContext(AppContext);
  const { t, i18n } = useTranslation();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [recordingSaved, setRecordingSaved] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [pendingAppointmentId, setPendingAppointmentId] = useState(null);

  const saveAppointment = useCallback((videoUrl) => {
    const appointmentId = Date.now().toString();
    const newAppointment = {
      id: appointmentId,
      doctorId: docInfo?._id || "unknown",
      name: docInfo?.name || "Unknown Doctor",
      speciality: docInfo?.speciality || "General",
      image: docInfo?.image || "",
      address: docInfo?.address || { line1: "Unknown", line2: "Unknown" },
      datetime: docSlots[slotIndex]?.find(slot => slot.time === slotTime)?.datetime || new Date(),
      videoUrl: videoUrl || null,
      uploadStatus: videoUrl ? "Uploaded" : (uploadProgress > 0 ? "Uploading" : "No video"),
    };
    console.log("Saving new appointment:", newAppointment);
    setAppointments((prev) => {
      const updated = [...prev, newAppointment];
      console.log("Updated appointments state:", updated);
      return updated;
    });
    setPendingAppointmentId(appointmentId);
  }, [docInfo, docSlots, slotIndex, slotTime, setAppointments, uploadProgress]);

  const updateAppointmentVideoUrl = useCallback((url, progress) => {
    if (!pendingAppointmentId) {
      console.warn("No pending appointment ID for video URL update");
      return;
    }
    console.log("Updating appointment video URL:", url, "Progress:", progress, "ID:", pendingAppointmentId);
    setAppointments((prev) => {
      const updated = prev.map((appt) =>
        appt.id === pendingAppointmentId
          ? {
              ...appt,
              videoUrl: url || appt.videoUrl,
              uploadStatus: progress > 0 && progress < 100 ? "Uploading" : url ? "Uploaded" : "No video",
            }
          : appt
      );
      console.log("Updated appointments with video URL:", updated);
      return updated;
    });
    if (url) setPendingAppointmentId(null);
  }, [pendingAppointmentId, setAppointments]);

  const {
    videoRef,
    isRecording,
    questionIndex,
    questions,
    recordingTime,
    previewUrl,
    startRecording,
    stopRecording,
    uploadRecording,
  } = useVideoRecorder(t, setDownloadUrl, setRecordingSaved, setUploadProgress, setUploadError, updateAppointmentVideoUrl);

  const getAvailableSlots = () => {
    console.log("Generating available slots");
    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const daySlots = [];
      const start = new Date(date.setHours(10, 0, 0));
      const end = new Date(date.setHours(21, 0, 0));

      for (let time = new Date(start); time < end; time.setMinutes(time.getMinutes() + 30)) {
        daySlots.push({
          datetime: new Date(time),
          time: time.toLocaleTimeString(i18n.language, { hour: "2-digit", minute: "2-digit" }),
          isBooked: Math.random() < 0.3,
        });
      }
      slots.push(daySlots);
    }
    setDocSlots(slots);
  };

  useEffect(() => {
    if (!docId || !doctors?.length) {
      console.warn("Invalid docId or no doctors:", { docId, doctorsLength: doctors?.length });
      setIsLoading(false);
      return;
    }
    console.log("Fetching doctor info for ID:", docId);
    const doctor = doctors.find((d) => d._id === docId);
    setDocInfo(doctor || {});
    setIsLoading(false);
  }, [docId, doctors]);

  useEffect(() => {
    if (docInfo) {
      console.log("Doctor info loaded, generating slots:", docInfo);
      getAvailableSlots();
    }
  }, [docInfo]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-600 to-teal-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white sm:h-16 sm:w-16"></div>
      </div>
    );
  }

  if (!docInfo || Object.keys(docInfo).length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-12 sm:px-6">
        <p className="text-red-500 text-base font-semibold sm:text-lg" role="alert">
          {t("appointment.error_doctor_not_found")}
        </p>
        <button
          onClick={() => navigate("/doctors")}
          className="mt-4 px-6 py-3 bg-teal-500 text-white rounded-full text-sm active:bg-teal-600 sm:text-base sm:py-2"
          aria-label={t("appointment.go_back")}
        >
          {t("appointment.go_back")}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-600 to-teal-400 pt-20 pb-12 sm:pt-28 sm:pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <DoctorProfile docInfo={docInfo} currencySymbol={currencySymbol} />

        {/* Booking Slots */}
        <h3 className="mt-8 text-xl font-semibold text-white sm:mt-12 sm:text-2xl">
          Available Slots
        </h3>
        <div className="flex overflow-x-auto gap-2 mt-4 pb-2 snap-x snap-mandatory sm:gap-4" aria-label={t("appointment.select_date")}>
          {docSlots.map((day, index) => {
            const date = day[0].datetime;
            return (
              <button
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap snap-center shadow-sm sm:px-5 sm:py-3 sm:text-base ${
                  slotIndex === index ? "bg-teal-500 text-white" : "bg-white text-gray-700"
                }`}
                aria-label={`${t("appointment.select_date")} ${date.toLocaleDateString(i18n.language, { weekday: "short", day: "numeric" })}`}
              >
                {date.toLocaleDateString(i18n.language, { weekday: "short", day: "numeric" })}
              </button>
            );
          })}
        </div>

        <div className="flex overflow-x-auto gap-2 mt-6 pb-2 snap-x snap-mandatory sm:gap-4" aria-label={t("appointment.select_time")}>
          {docSlots[slotIndex]?.map((slot, index) => (
            <button
              key={index}
              onClick={() => !slot.isBooked && setSlotTime(slot.time)}
              disabled={slot.isBooked}
              className={`px-4 py-2 rounded-full border text-xs whitespace-nowrap snap-center shadow-sm sm:px-5 sm:text-sm sm:py-2 ${
                slot.isBooked
                  ? "bg-gray-200 text-gray-400"
                  : slot.time === slotTime
                  ? "bg-teal-500 text-white"
                  : "bg-white text-gray-700 hover:bg-teal-100 active:bg-teal-200"
              }`}
              aria-label={`${t("appointment.select_time")} ${slot.time}${slot.isBooked ? ` (${t("appointment.booked")})` : ""}`}
            >
              {slot.time} {slot.isBooked && <span className="ml-1 text-xs sm:ml-2">{t("appointment.booked")}</span>}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-6 sm:flex-row">
          <button
            onClick={() => {
              console.log("Record Symptoms button clicked");
              setShowRecordModal(true);
            }}
            className="px-8 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 text-sm sm:text-base"
            aria-label={t("appointment.record_symptoms")}
          >
            Record Symptoms for {docInfo?.name || "Doctor"}
          </button>
          <button
            onClick={() => setShowBookingModal(true)}
            disabled={!slotTime}
            className={`px-8 py-3 rounded-full font-semibold text-sm sm:text-base ${
              slotTime ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800" : "bg-gray-300 text-gray-500"
            }`}
            aria-label={t("appointment.book_appointment")}
          >
            Book Appointment with {docInfo?.name || "Doctor"}
          </button>
        </div>
      </div>

      <RecordingModal
        t={t}
        show={showRecordModal}
        onClose={() => {
          console.log("Closing recording modal");
          if (isRecording) stopRecording();
          setShowRecordModal(false);
          setUploadError(null);
        }}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
        uploadRecording={uploadRecording}
        videoRef={videoRef}
        questionIndex={questionIndex}
        questions={questions}
        recordingTime={recordingTime}
        previewUrl={previewUrl}
        downloadUrl={downloadUrl}
        doctorName={docInfo?.name}
        uploadError={uploadError}
      />

      <BookingModal
        t={t}
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        slotTime={slotTime}
        docInfo={docInfo}
        currencySymbol={currencySymbol}
        i18n={i18n}
        downloadUrl={downloadUrl}
        docSlots={docSlots}
        slotIndex={slotIndex}
        navigate={navigate}
        saveAppointment={saveAppointment}
        uploadProgress={uploadProgress}
      />

      {recordingSaved && (
        <div
          className="fixed bottom-4 right-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 sm:text-base"
          aria-live="polite"
        >
          {t("appointment.recording_saved")}
          <button
            onClick={() => setRecordingSaved(false)}
            className="text-white hover:text-gray-200"
            aria-label={t("appointment.dismiss_notification")}
          >
            &times;
          </button>
        </div>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div
          className="fixed bottom-16 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 sm:bottom-20 sm:text-base"
          aria-live="polite"
        >
          {t("appointment.uploading")} {Math.round(uploadProgress)}%
          <button
            onClick={() => setUploadProgress(0)}
            className="text-white hover:text-gray-200"
            aria-label={t("appointment.dismiss_notification")}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointment;