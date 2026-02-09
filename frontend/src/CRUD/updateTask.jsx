import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateTask() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("user")
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/getTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setTask(result.data.task);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/updateTask/${id}`, { name, task }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
  })
      .then((result) => {
        navigate(`/user/${userName}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="bg-white rounded-4 shadow p-4 p-md-5 w-100"
        style={{ maxWidth: "500px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/user" className="btn border-dark">
            Back
          </Link>
          <h3 className="text-center fw-bold m-0 d-block">Update User</h3>
          {/* <div style={{ width: "75px" }}>spacer to center heading</div> */}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="task" className="form-label fw-semibold">
              Task
            </label>
            <textarea
              className="form-control"
              id="task"
              name="task"
              placeholder="Enter task details"
              rows="3"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
