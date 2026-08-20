import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [doctorsRes, appointmentsRes] = await Promise.all([
          api.get("/doctors"),
          api.get("/appointments"),
        ]);
        let patientsCount = 0;
        try {
          const patientsRes = await api.get("/patients");
          patientsCount = patientsRes.data.length;
        } catch {
          // patients endpoint may be restricted for non-admin roles
        }
        setStats({
          doctors: doctorsRes.data.length,
          patients: patientsCount,
          appointments: appointmentsRes.data.length,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="page-container">
      <h1>Welcome, {user?.username} 👋</h1>
      <p className="subtitle">Role: {user?.role}</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{stats.doctors}</h2>
          <p>Doctors</p>
        </div>
        <div className="stat-card">
          <h2>{stats.patients}</h2>
          <p>Patients</p>
        </div>
        <div className="stat-card">
          <h2>{stats.appointments}</h2>
          <p>Appointments</p>
        </div>
      </div>
    </div>
  );
}
