import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"; // We'll use one CSS file for both to keep it clean

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/login`, { email, password })
      .then((result) => {
        if (result.data.message === "success") {
          const userName = result.data.username;
          localStorage.setItem("user", userName);
          localStorage.setItem("token", result.data.token);
          navigate(`/dashboard`);
        }
      })
      .catch((err) => {
        setErr("Invalid email or password. Please check your credentials.");
      });
  };

  return (
    <div className="auth-container">
      <div className="glass-card">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Please enter your details to login</p>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              minLength={6}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {err && <h6 className="text-danger">{err}</h6>}

          <button type="submit" className="auth-btn">
            Login Now
          </button>

          <div className="auth-footer">
            <span>Don't have an account? </span>
            <Link to="/registration" className="auth-link">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
