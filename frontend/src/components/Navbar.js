import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">🏥 Smart Hospital MS</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/appointments">Appointments</Link>
      </div>
      <div className="navbar-user">
        <span>{user?.username} ({user?.role})</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
