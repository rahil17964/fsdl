import React from "react";
import "./AddEventModal.css";

export default function AddEventModal({
  onClose,
  onSubmit,
  eventData,
  onChange,
}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Event</h2>
        <form onSubmit={onSubmit} className="form">
          <input
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={onChange}
            required
          />
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={onChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={onChange}
            required
          ></textarea>
          <button type="submit">Create Event</button>
          <button type="button" className="close-button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
