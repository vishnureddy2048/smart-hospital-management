import React from "react";

export default function PatientCard({ patient, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{patient.fullName}</h3>
      <p><strong>Gender:</strong> {patient.gender ?? "-"}</p>
      <p><strong>Blood Group:</strong> {patient.bloodGroup ?? "-"}</p>
      <p><strong>Phone:</strong> {patient.phoneNumber}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      {(onEdit || onDelete) && (
        <div className="card-actions">
          {onEdit && <button onClick={() => onEdit(patient)}>Edit</button>}
          {onDelete && <button className="danger" onClick={() => onDelete(patient.id)}>Delete</button>}
        </div>
      )}
    </div>
  );
}
