import React, { useState } from "react";
import { doctors } from "../data";
import DoctorBookingModal from "./DoctorBookingModal";
import "./BookAppointment.css";

const DEPARTMENTS = [
  ...new Set(doctors.map((doc) => doc.dept)),
];

export default function BookAppointment() {
  const [dept, setDept] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors); // show all initially
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  function handleFilter(e) {
    e.preventDefault();

    let filtered = doctors;
    if (dept) {
      filtered = filtered.filter((d) => d.dept === dept);
    }
    setFilteredDoctors(filtered);
  }

  function handleClearFilters() {
    setDept("");
    setFilteredDoctors(doctors);
  }

  return (
    <div className="book-appointment-container">
      <h1>Book Checkup Appointment</h1>

      <form onSubmit={handleFilter} className="filter-form">
        <label>
          Department:
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="">-- Select Dept --</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>

        <button type="submit">Search Doctors</button>
        <button type="button" onClick={handleClearFilters} style={{ marginLeft: "10px" }}>
          Clear Filters
        </button>
      </form>

      <div className="doctor-list">
        {filteredDoctors.length === 0 && <p>No doctors found, or please search.</p>}
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="doctor-card"
            onClick={() => setSelectedDoctor(doc)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => { if(e.key === 'Enter') setSelectedDoctor(doc); }}
          >
            <h3>{doc.name}</h3>
            <p>{doc.dept}</p>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <DoctorBookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
