import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [events, setEvents] = useState([]);

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    description: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    contact: "",
    username: "",
    password: "",
  });

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const existingUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    if (existingUsers.find((user) => user.username === signUpData.username)) {
      alert("Username already taken.");
      return;
    }
    const updatedUsers = [...existingUsers, signUpData];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
    alert("Account created successfully! Please sign in.");
    setShowSignUp(false);
    setSignUpData({
      name: "",
      email: "",
      contact: "",
      username: "",
      password: "",
    });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const matchingUser = registeredUsers.find(
      (u) =>
        u.username === signInData.username && u.password === signInData.password
    );

    if (matchingUser) {
      setUser(matchingUser);
      setShowSignIn(false);
      setSignInData({ username: "", password: "" });
    } else {
      alert("Invalid username or password!");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert("Searching for: " + searchTerm);
    setSearchTerm("");
  };

  const handleEventChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, eventData]);
    setEventData({ title: "", date: "", description: "" });
    setShowAddEventModal(false);
    setActiveSection("events"); // switch to events section after creation
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-items">
          <li onClick={() => setActiveSection("home")}>Home</li>
          <li onClick={() => setActiveSection("events")}>Events</li>
          <li onClick={() => setShowAddEventModal(true)}>Add Event</li>
        </ul>

        <div className="auth-section">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.username}</span>
              <button className="auth-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="auth-button"
                onClick={() => {
                  setShowSignIn(true);
                  setShowSignUp(false);
                }}
              >
                Sign In
              </button>
              <button
                className="auth-button"
                onClick={() => {
                  setShowSignUp(true);
                  setShowSignIn(false);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="full-width-search"
        />
        <button type="submit" className="searchButton" aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            width="24"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M21.71 20.29l-5.4-5.39a7 7 0 1 0-1.41 1.41l5.39 5.4a1 1 0 0 0 1.42-1.42zM10 16a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
          </svg>
        </button>
      </form>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Event</h2>
            <form onSubmit={handleAddEvent} className="form">
              <input
                name="title"
                placeholder="Event Title"
                value={eventData.title}
                onChange={handleEventChange}
                required
              />
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleEventChange}
                required
              />
              <textarea
                name="description"
                placeholder="Event Description"
                value={eventData.description}
                onChange={handleEventChange}
                required
              ></textarea>
              <button type="submit">Create Event</button>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowAddEventModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Show Events only when section is active */}
      {activeSection === "events" && events.length > 0 && (
        <div className="event-container">
          {events.map((event, idx) => (
            <div key={idx} className="event-card">
              <h3 className="event-title">{event.title}</h3>
              <div className="event-date">{event.date}</div>
              <p className="event-description">{event.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Sign In / Sign Up Modals */}
      {showSignUp && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUpSubmit} className="form">
              <input
                name="name"
                placeholder="Name"
                value={signUpData.name}
                onChange={handleSignUpChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signUpData.email}
                onChange={handleSignUpChange}
                required
              />
              <input
                name="contact"
                placeholder="Contact"
                value={signUpData.contact}
                onChange={handleSignUpChange}
                required
              />
              <input
                name="username"
                placeholder="Username"
                value={signUpData.username}
                onChange={handleSignUpChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                required
              />
              <button type="submit">Register</button>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowSignUp(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {showSignIn && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sign In</h2>
            <form onSubmit={handleSignInSubmit} className="form">
              <input
                name="username"
                placeholder="Username"
                value={signInData.username}
                onChange={handleSignInChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signInData.password}
                onChange={handleSignInChange}
                required
              />
              <button type="submit">Login</button>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowSignIn(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
