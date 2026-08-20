import React from "react";

export default function AppointmentCard({ appointment, onCancel, onStatusChange }) {
  return (
    <div className={`card appointment ${appointment.status.toLowerCase()}`}>
      <h3>{appointment.patient?.fullName} → Dr. {appointment.doctor?.fullName}</h3>
      <p><strong>When:</strong> {new Date(appointment.appointmentDateTime).toLocaleString()}</p>
      <p><strong>Reason:</strong> {appointment.reason || "-"}</p>
      <p><strong>Status:</strong> <span className="status-badge">{appointment.status}</span></p>
      <div className="card-actions">
        {onStatusChange && appointment.status === "PENDING" && (
          <button onClick={() => onStatusChange(appointment.id, "CONFIRMED")}>Confirm</button>
        )}
        {onCancel && appointment.status !== "CANCELLED" && (
          <button className="danger" onClick={() => onCancel(appointment.id)}>Cancel</button>
        )}
      </div>
    </div>
  );
}
