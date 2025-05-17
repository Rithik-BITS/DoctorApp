import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">DoctorApp</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/home" className={({isActive}) => isActive ? "active-link" : ""}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/book-appointment" className={({isActive}) => isActive ? "active-link" : ""}>Book Doctor Appointment</NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({isActive}) => isActive ? "active-link" : ""}>History</NavLink>
        </li>
        <li className="username">Hi, {user.username}</li>
        <li>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
}
