import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css"; 

export default function User() {
  const { username } = useParams();
  const [users, setUser] = useState([]);
  const [task, setTask] = useState("");
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  // Fetch Tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(`${API}/getTasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((result) => setUser(result.data))
    .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`${API}/deleteTask/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => fetchTasks()) // Refresh list without reloading page
    .catch((err) => console.log(err));
  };

  const CreateTask = (e) => {
    e.preventDefault();
    axios.post(`${API}/createTask`, { task }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setTask(""); // Clear input
      fetchTasks(); // Refresh list
    })
    .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="glass-panel">
        <div className="dashboard-header">
          <h2>Welcome, <span className="highlight">{username}</span></h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <form className="task-form" onSubmit={CreateTask}>
          <input
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={task}
            required
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit" className="add-btn">Add Task</button>
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
                  <td><div className="user-badge">{username[0]}</div></td>
                  <td className="task-text">{user.task}</td>
                  <td className="text-right">
                    <Link to={`/update/${user._id}`} className="edit-link">Edit</Link>
                    <button onClick={() => handleDelete(user._id)} className="delete-link">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="empty-msg">No tasks found. Add one above!</p>}
        </div>
      </div>
    </div>
  );
}
