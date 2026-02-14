import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; 

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [err, setErr] = useState("");
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API}/registration`, { name, email, password }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => navigate("/login"))
    .catch(() => setErr("Registration failed. Try a different email."));
  };

  return (
    <div className="signup-page">
      <div className="glass-card">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="title">Create Account</h2>
          <p className="subtitle">Welcome! Please enter your details.</p>

          <div className="input-box">
            <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-box">
            <input type="email" placeholder="Email Address" onChange={(e) => setemail(e.target.value)} required />
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} minLength={6} required />
          </div>

          {err && <h6 className="text-danger">{err}</h6>}

          <button type="submit" className="main-btn">Sign Up</button>
          
          <div className="form-footer">
            <span>Already have an account? </span>
            <Link to="/login" className="link">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
