import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./components/LoginRegister";
import Home from "./components/Home";
import BookAppointment from "./components/BookAppointment";
import AppointmentHistory from "./components/AppointmentHistory";
import Navbar from "./components/Navbar";
import { AuthContext } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <LoginRegister />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/book-appointment"
          element={user ? <BookAppointment /> : <Navigate to="/" />}
        />
        <Route
          path="/history"
          element={user ? <AppointmentHistory /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
