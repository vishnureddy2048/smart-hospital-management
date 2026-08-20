import React from "react";

export default function DoctorCard({ doctor, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{doctor.fullName}</h3>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Department:</strong> {doctor.department}</p>
      <p><strong>Experience:</strong> {doctor.experienceYears ?? "-"} yrs</p>
      <p><strong>Phone:</strong> {doctor.phoneNumber}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      {(onEdit || onDelete) && (
        <div className="card-actions">
          {onEdit && <button onClick={() => onEdit(doctor)}>Edit</button>}
          {onDelete && <button className="danger" onClick={() => onDelete(doctor.id)}>Delete</button>}
        </div>
      )}
    </div>
  );
}
