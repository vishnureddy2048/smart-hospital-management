import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import DoctorCard from "../components/DoctorCard";
import { useAuth } from "../context/AuthContext";

const emptyForm = {
  fullName: "", specialization: "", phoneNumber: "", email: "",
  qualification: "", experienceYears: "", department: "",
};

export default function Doctors() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadDoctors = async () => {
    const res = await api.get("/doctors");
    setDoctors(res.data);
  };

  useEffect(() => { loadDoctors(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/doctors/${editingId}`, form);
    } else {
      await api.post("/doctors", form);
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    loadDoctors();
  };

  const handleEdit = (doctor) => {
    setForm(doctor);
    setEditingId(doctor.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this doctor?")) {
      await api.delete(`/doctors/${id}`);
      loadDoctors();
    }
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Doctors</h1>
        {isAdmin && (
          <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}>
            {showForm ? "Close" : "+ Add Doctor"}
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <form className="inline-form" onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
          <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} required />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
          <input name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange} />
          <input name="experienceYears" type="number" placeholder="Experience (yrs)" value={form.experienceYears} onChange={handleChange} />
          <input name="phoneNumber" placeholder="Phone Number" value={form.phoneNumber} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <button type="submit">{editingId ? "Update" : "Save"} Doctor</button>
        </form>
      )}

      <div className="grid">
        {doctors.map((doc) => (
          <DoctorCard
            key={doc.id}
            doctor={doc}
            onEdit={isAdmin ? handleEdit : null}
            onDelete={isAdmin ? handleDelete : null}
          />
        ))}
        {doctors.length === 0 && <p>No doctors found.</p>}
      </div>
    </div>
  );
}
