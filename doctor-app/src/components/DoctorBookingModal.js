import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import "./DoctorBookingModal.css";

export default function DoctorBookingModal({ doctor, date, time, onClose }) {
  const { user, addAppointment } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(date || "");
  const [selectedTime, setSelectedTime] = useState(time || "");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }
    setLoading(true);
    // Fake booking delay
    setTimeout(() => {
      addAppointment({
        id: Date.now(),
        doctorId: doctor.id,
        doctorName: doctor.name,
        dept: doctor.dept,
        date: selectedDate,
        time: selectedTime,
        username: user.username,
      });
      setLoading(false);
      alert("Appointment booked successfully!");
      onClose();
    }, 800);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h2>Book Appointment with {doctor.name}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Date:
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </label>

          <label>
            Time:
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            />
          </label>

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Book"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
