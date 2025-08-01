# HealthDesk

HealthDesk is a modern, responsive healthcare appointment booking web application built with React, Tailwind CSS, and Framer Motion. It provides a seamless experience for users to browse doctors, book appointments, record and upload symptom videos, and manage their bookings—all with smooth, animated UI transitions.

---

## Features

- **Browse Doctors:**  
  Search and filter doctors by specialty. View detailed doctor profiles including qualifications, experience, and availability.

- **Book Appointments:**  
  Select from available time slots and confirm your appointment with a doctor.

- **Symptom Video Recording:**  
  Record a video describing your symptoms directly from your browser and upload it as part of your appointment.

- **Appointment Management:**  
  View, manage, and cancel your upcoming appointments from a dedicated dashboard.

- **Animated User Interface:**  
  Enjoy smooth transitions and modals powered by Framer Motion for a delightful user experience.

- **Responsive Design:**  
  Fully optimized for both desktop and mobile devices.

---

## Tech Stack

- **React** – Frontend library for building user interfaces
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development
- **Framer Motion** – Animation library for React
- **React Router** – Declarative routing for React
- **Firebase Storage** – (Optional) For video uploads (can be replaced with your own backend)
- **Vite** – Fast development server and build tool

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/healthdesk.git
    cd healthdesk/frontend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    # or
    yarn install
    ```

3. **(Optional) Configure Firebase Storage:**
    - If you want to enable video uploads, create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Enable Firebase Storage.
    - Copy your Firebase config and replace it in `src/firebase.js`.
    - If you do not wish to use Firebase, you can stub out or replace the upload logic in the codebase.

4. **Start the development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    ```

5. **Open in your browser:**
    ```
    http://localhost:5173
    ```

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable UI components (Navbar, etc.)
│   ├── context/        # React context for global state
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Main pages (Doctors, Appointment, MyAppointments, etc.)
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind and global styles
├── package.json
└── vite.config.js
```

---

## Customization

- **Add or Update Doctors:**  
  Doctor data can be managed in your backend or within the React context/provider.

- **Styling:**  
  Modify Tailwind classes in the components or add custom styles in `index.css`.

- **Animations:**  
  Enhance or adjust UI animations using Framer Motion in your components.

- **Video Uploads:**  
  By default, video uploads use Firebase Storage. You can replace this with your own backend or disable the feature if not needed.

---

## Known Limitations

- **Internationalization (i18n):**  
  The current version does not support multiple languages or i18n features.
- **No Backend for Doctor Data:**  
  Doctor and appointment data is managed in React context or local state. For production, connect to a real backend or database.
- **Firebase Locales:**  
  Firebase localization and i18n are not enabled in this project.

---

## License

This project is licensed under the MIT License.

---

**Made with ❤️ for modern healthcare.**
