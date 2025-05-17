import React, { useState, useContext } from "react";
import "./Home.css";
import { AuthContext } from "../AuthContext";
import { labTests } from "../data";
import { toast } from "react-toastify";


export default function Home() {
  const {
    user,
    labAppointments,
    addLabAppointment,
  } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  // Lab booking popup states
  const [showLabPopup, setShowLabPopup] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Tabs state
  const [activeTab, setActiveTab] = useState("home");

  const filteredTests = labTests.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept ? test.dept.toLowerCase() === selectedDept.toLowerCase() : true;
    return matchesSearch && matchesDept;
  });

  function openLabBooking(test) {
    setSelectedTest(test);
    setSelectedDate("");
    setSelectedTime("");
    setShowLabPopup(true);
  }

  function bookLabAppointment() {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      username: user.username,
      test: selectedTest.name,
      date: selectedDate,
      time: selectedTime,
    };

    addLabAppointment(newAppointment);
    setShowLabPopup(false);
    toast.success("Lab test appointment booked successfully!");
  }

  return (
    <div className="container">
      <h1>Lab Tests Booking</h1>


      {activeTab === "home" && (
        <>
          {/* Lab Test Filters */}
          <div className="filter-form">
            <input
              type="text"
              placeholder="Search lab tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
              <option value="">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pathology">Pathology</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>

          {/* Lab Tests List */}
          <ul className="test-list">
            {filteredTests.length === 0 ? (
              <p>No tests match your criteria.</p>
            ) : (
              filteredTests.map((test) => (
                <li key={test.id} className="test-card">
                  <h3>{test.name}</h3>
                  <p>{test.description}</p>
                  <p><strong>Price:</strong> ${test.price}</p>
                  <p><strong>Department:</strong> {test.dept}</p>
                  <button className="book-btn" onClick={() => openLabBooking(test)}>Book Appointment</button>
                </li>
              ))
            )}
          </ul>
        </>
      )}

      {activeTab === "history" && (
        <div>
          <h2>Lab Test Appointment History</h2>
          {labAppointments.filter(a => a.username === user.username).length === 0 ? (
            <p>No lab appointments booked yet.</p>
          ) : (
            <ul className="appointment-list">
              {labAppointments
                .filter(a => a.username === user.username)
                .map((appt) => (
                  <li key={appt.id} className="appointment-card">
                    <h3>{appt.test}</h3>
                    <p><strong>Date:</strong> {appt.date}</p>
                    <p><strong>Time:</strong> {appt.time}</p>
                    <p><em>Lab Test Appointment</em></p>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}

      {/* Booking Popup */}
      {showLabPopup && (
        <div className="popup-overlay" onClick={() => setShowLabPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Book Appointment for {selectedTest.name}</h2>
            <label>
              Select Date:{" "}
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>
            <label>
              Select Time:{" "}
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </label>

            <div className="popup-buttons">
              <button onClick={bookLabAppointment}>Confirm Booking</button>
              <button onClick={() => setShowLabPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
