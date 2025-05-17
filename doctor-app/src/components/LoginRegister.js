// src/components/LoginRegister.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import "./LoginRegister.css";

export default function LoginRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // or "register"
  const [error, setError] = useState("");
  const { login, register } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    let result;
    if (mode === "login") {
      result = login(username.trim(), password.trim());
    } else {
      result = register(username.trim(), password.trim());
    }

    if (!result.success) {
      setError(result.message);
    } else {
      setError("");
      // Optional: clear form or redirect user here
    }
  }

  return (
    <div className="auth-container">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        {error && <div className="error">{error}</div>}
        <button type="submit">{mode === "login" ? "Login" : "Register"}</button>
      </form>
      <p className="toggle-text">
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          className="toggle-btn"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
        >
          {mode === "login" ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
