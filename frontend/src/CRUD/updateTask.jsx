import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./update.css"; 

export default function UpdateTask() {
  const { id } = useParams();
  const [task, setTask] = useState("");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("user");
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/getTask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setTask(result.data.task);
      })
      .catch((err) => console.log(err));
  }, [id, API, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API}/updateTask/${id}`, { task }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        navigate(`/dashboard`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="update-container">
      <div className="glass-update-card">
        <div className="update-header">
          <Link to={`/user/${userName}`} className="back-link">
            ← Back
          </Link>
          <h2  className="update-title">Edit Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="update-form">
          <div className="input-box">
            <label className="input-label">Task Description</label>
            <textarea
              className="update-textarea"
              rows="5"
              placeholder="What needs to be changed?"
              value={task}
              required
              onChange={(e) => setTask(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="update-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
