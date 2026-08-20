import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import PatientCard from "../components/PatientCard";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  fullName: "", dateOfBirth: "", gender: "", phoneNumber: "",
  email: "", address: "", bloodGroup: "", medicalHistory: "",
};

export default function Patients() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const loadPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (err) {
      setError("You may not have permission to view all patients.");
    }
  };

  useEffect(() => { loadPatients(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/patients/${editingId}`, form);
    } else {
      await api.post("/patients", form);
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    loadPatients();
  };

  const handleEdit = (patient) => {
    setForm(patient);
    setEditingId(patient.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this patient?")) {
      await api.delete(`/patients/${id}`);
      loadPatients();
    }
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Patients</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}>
          {showForm ? "Close" : "+ Add Patient"}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {showForm && (
        <form className="inline-form" onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
          <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={handleChange} />
          <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <textarea name="medicalHistory" placeholder="Medical History" value={form.medicalHistory} onChange={handleChange} />
          <button type="submit">{editingId ? "Update" : "Save"} Patient</button>
        </form>
      )}

      <div className="grid">
        {patients.map((p) => (
          <PatientCard
            key={p.id}
            patient={p}
            onEdit={handleEdit}
            onDelete={isAdmin ? handleDelete : null}
          />
        ))}
        {patients.length === 0 && !error && <p>No patients found.</p>}
      </div>
    </div>
  );
}
