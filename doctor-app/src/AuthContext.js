// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Store registered users with username + password in localStorage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Your appointments & labAppointments states here, for example:
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [labAppointments, setLabAppointments] = useState(() => {
    const saved = localStorage.getItem("labAppointments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("labAppointments", JSON.stringify(labAppointments));
  }, [labAppointments]);

  // Login function checks username + password
  function login(username, password) {
    const existingUser = users.find((u) => u.username === username);
    if (!existingUser) {
      return { success: false, message: "User not found" };
    }
    if (existingUser.password !== password) {
      return { success: false, message: "Incorrect password" };
    }
    setUser({ username });
    return { success: true };
  }

  // Register function adds new user if username not taken
  function register(username, password) {
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return { success: false, message: "Username already taken" };
    }
    const newUser = { username, password };
    setUsers((prev) => [...prev, newUser]);
    setUser({ username });
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  function addAppointment(appt) {
    setAppointments((prev) => [...prev, appt]);
  }

  function addLabAppointment(appt) {
    setLabAppointments((prev) => [...prev, appt]);
  }

  function deleteAppointment(id) {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  }

  function deleteLabAppointment(id) {
    setLabAppointments((prev) => prev.filter((appt) => appt.id !== id));
  }



  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        appointments,
        addAppointment,
        labAppointments,
        addLabAppointment,
        deleteAppointment,
        deleteLabAppointment
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
