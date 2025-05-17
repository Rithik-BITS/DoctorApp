import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import "./AppointmentHistory.css";

export default function AppointmentHistory() {
  const {
    appointments = [],
    labAppointments = [],
    user,
    deleteAppointment,
    deleteLabAppointment,
  } = useContext(AuthContext);

  if (!user) {
    return <p>Please login to see your appointment history.</p>;
  }

  const userAppointments = appointments.filter(
    (appt) => appt.username === user.username
  );

  const userLabAppointments = labAppointments.filter(
    (appt) => appt.username === user.username
  );

  return (
    <div className="history-container">
      <h1>Your Appointments</h1>

      {/* Doctor Appointments */}
      <h2>Doctor Appointments</h2>
      {userAppointments.length === 0 ? (
        <p>No doctor appointments booked yet.</p>
      ) : (
        <ul className="appointment-list">
          {userAppointments.map((appt) => (
            <li key={appt.id} className="appointment-card">
              <h3>{appt.doctorName || "N/A"}</h3>
              <p><strong>Department:</strong> {appt.dept || "N/A"}</p>
              <p><strong>Date:</strong> {appt.date || "N/A"}</p>
              <p><strong>Time:</strong> {appt.time || "N/A"}</p>
              <button
                className="delete-btn"
                onClick={() => deleteAppointment(appt.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lab Test Appointments */}
      <h2>Lab Test Appointments</h2>
      {userLabAppointments.length === 0 ? (
        <p>No lab test appointments booked yet.</p>
      ) : (
        <ul className="appointment-list">
          {userLabAppointments.map((appt) => (
            <li key={appt.id} className="appointment-card">
              <h3>{appt.test?.name || appt.test || "N/A"}</h3>
              <p><strong>Date:</strong> {appt.date || "N/A"}</p>
              <p><strong>Time:</strong> {appt.time || "N/A"}</p>
              <button
                className="delete-btn"
                onClick={() => deleteLabAppointment(appt.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
