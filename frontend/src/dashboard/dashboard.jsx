import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

export default function User() {
  const [users, setUser] = useState([]);
  let username = localStorage.getItem("user");
  const [task, setTask] = useState("");
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // Fetch Tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get(`${API}/getTasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => setUser(result.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/deleteTask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchTasks())
      .catch((err) => console.log(err));
  };

  const CreateTask = (e) => {
    e.preventDefault();
    axios
      .post(
        `${API}/createTask`,
        { task },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        setTask("");
        fetchTasks();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Ye function file ko Base64 text mein convert karta hai
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const UploadImage = async (event) => {
    const file = event.target.files[0];
    const Base64 = await convertBase64(file);
    setLoading(true);

    axios
      .post(
        `${API}/uploadImage`,
        { image: Base64 },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then((res) => {
        setUrl(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="glass-panel">
        <div className="dashboard-header">
          <h2>
            Welcome, <span className="highlight">{username}</span>
          </h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {/* Profile Image Section - Optimized for Circle & Beauty */}
        <div className="d-flex justify-content-center my-4">
          <label className="position-relative" style={{ cursor: "pointer" }}>
            <div
              className="rounded-circle border border-3 border-primary shadow-sm"
              style={{
                width: "140px",
                height: "140px",
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <img
                  src={
                    url ||
                    `https://ui-avatars.com{username || 'User'}&background=random`
                  }
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>

            {/* Camera Icon Overlay */}
            <span
              className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex justify-content-center align-items-center shadow"
              style={{
                width: "38px",
                height: "38px",
                fontSize: "16px",
                border: "3px solid #fff",
                transform: "translate(-10%, -10%)",
              }}
            >
              📷
            </span>

            <input type="file" onChange={UploadImage} accept="image/*" hidden />
          </label>
        </div>
        {/* End Image Section */}

        <form className="task-form" onSubmit={CreateTask}>
          <input
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={task}
            required
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="add-btn">
            Add Task
          </button>
        </form>

        <div className="task-list-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Task Description</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="task-row">
                  <td>
                    <div className="user-badge">
                      {username ? username[0].toUpperCase() : "U"}
                    </div>
                  </td>
                  <td className="task-text">{user.task}</td>
                  <td className="text-right">
                    <Link to={`/update/${user._id}`} className="edit-link">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="delete-link"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="empty-msg">No tasks found. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}
