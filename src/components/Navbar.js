import React, { useState } from "react";
import "./Navbar.css";

const menuItems = [
  { label: "Home", icon: "pi pi-home" },
  { label: "Events", icon: "pi pi-star" },
  { label: "Add Event", icon: "pi pi-plus" },
];

export default function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    contact: "",
    username: "",
    password: "",
  });

  const [signInForm, setSignInForm] = useState({
    username: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpForm.username || !signUpForm.password) {
      alert("Username and password are required.");
      return;
    }
    if (users.find((u) => u.username === signUpForm.username)) {
      alert("Username already taken.");
      return;
    }
    setUsers([...users, signUpForm]);
    alert("Sign up successful! Please sign in.");
    setSignUpForm({
      name: "",
      email: "",
      contact: "",
      username: "",
      password: "",
    });
    setShowSignUp(false);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) =>
        u.username === signInForm.username && u.password === signInForm.password
    );
    if (user) {
      setLoggedInUser(user);
      setAuthOpen(false);
      setSignInForm({ username: "", password: "" });
    } else {
      alert("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <>
      <nav className="navbar">
        <ul className="menu">
          {menuItems.map((item, idx) => (
            <li key={idx} className="menu-item">
              <a href="#!" className="menu-link">
                <i className={item.icon}></i>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="auth-section">
          {loggedInUser ? (
            <>
              <span className="username-display">
                Hello, {loggedInUser.username}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="signin-btn"
              onClick={() => {
                setAuthOpen(true);
                setShowSignUp(false);
              }}
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </nav>

      {authOpen && (
        <div className="auth-modal-backdrop" onClick={() => setAuthOpen(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setAuthOpen(false)}>
              ×
            </button>

            {showSignUp ? (
              <>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUpSubmit}>
                  <input
                    name="name"
                    placeholder="Name"
                    value={signUpForm.name}
                    onChange={handleSignUpChange}
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email ID"
                    value={signUpForm.email}
                    onChange={handleSignUpChange}
                    required
                  />
                  <input
                    name="contact"
                    placeholder="Contact Number"
                    value={signUpForm.contact}
                    onChange={handleSignUpChange}
                    required
                  />
                  <input
                    name="username"
                    placeholder="Username"
                    value={signUpForm.username}
                    onChange={handleSignUpChange}
                    required
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={signUpForm.password}
                    onChange={handleSignUpChange}
                    required
                  />
                  <button type="submit">Register</button>
                </form>
                <p>
                  Already have an account?{" "}
                  <button
                    className="toggle-auth-btn"
                    onClick={() => setShowSignUp(false)}
                  >
                    Sign In
                  </button>
                </p>
              </>
            ) : (
              <>
                <h2>Sign In</h2>
                <form onSubmit={handleSignInSubmit}>
                  <input
                    name="username"
                    placeholder="Username"
                    value={signInForm.username}
                    onChange={handleSignInChange}
                    required
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={signInForm.password}
                    onChange={handleSignInChange}
                    required
                  />
                  <button type="submit">Login</button>
                </form>
                <p>
                  Don't have an account?{" "}
                  <button
                    className="toggle-auth-btn"
                    onClick={() => setShowSignUp(true)}
                  >
                    Sign Up
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
