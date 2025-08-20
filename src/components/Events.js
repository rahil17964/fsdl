import React from "react";
import "./Events.css";

export default function Events({ events }) {
  if (!events.length) return <p className="no-events">No events to show.</p>;

  return (
    <div className="event-container">
      {events.map((event, idx) => (
        <div key={idx} className="event-card">
          <h3 className="event-title">{event.title}</h3>
          <div className="event-date">{event.date}</div>
          <p className="event-description">{event.description}</p>
        </div>
      ))}
    </div>
  );
}
