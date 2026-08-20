import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import AppointmentCard from "../components/AppointmentCard";

const emptyForm = { patientId: "", doctorId: "", appointmentDateTime: "", reason: "" };

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    const [apptRes, docRes] = await Promise.all([
      api.get("/appointments"),
      api.get("/doctors"),
    ]);
    setAppointments(apptRes.data);
    setDoctors(docRes.data);
    try {
      const patRes = await api.get("/patients");
      setPatients(patRes.data);
    } catch {
      // non-admin roles may not be able to list all patients
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/appointments", form);
    setForm(emptyForm);
    setShowForm(false);
    loadData();
  };

  const handleCancel = async (id) => {
    await api.delete(`/appointments/${id}`);
    loadData();
  };

  const handleStatusChange = async (id, status) => {
    await api.put(`/appointments/${id}/status?status=${status}`);
    loadData();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Appointments</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Book Appointment"}
        </button>
      </div>

      {showForm && (
        <form className="inline-form" onSubmit={handleSubmit}>
          <select name="patientId" value={form.patientId} onChange={handleChange} required>
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.fullName}</option>
            ))}
          </select>
          <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>Dr. {d.fullName} ({d.specialization})</option>
            ))}
          </select>
          <input
            name="appointmentDateTime"
            type="datetime-local"
            value={form.appointmentDateTime}
            onChange={handleChange}
            required
          />
          <textarea name="reason" placeholder="Reason for visit" value={form.reason} onChange={handleChange} />
          <button type="submit">Book Appointment</button>
        </form>
      )}

      <div className="grid">
        {appointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            appointment={appt}
            onCancel={handleCancel}
            onStatusChange={handleStatusChange}
          />
        ))}
        {appointments.length === 0 && <p>No appointments found.</p>}
      </div>
    </div>
  );
}
