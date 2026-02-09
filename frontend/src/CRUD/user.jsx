import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CreateTask from "./createTask";

export default function User() {
  const { username } = useParams();
  const [users, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const [task,setTask] = useState("") 
  useEffect(() => {
    axios
      .get("http://localhost:4000/getTasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/deleteTask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  function Handler(){
      e.preventDefault();
CreateTask(task)
  }

  return (
    <div className="container-fluid min-vh-100  d-flex justify-content-center align-items-center px-2">
      <div
        className="bg-white rounded-4   shadow w-100 p-3 p-md-4 "
        style={{ maxWidth: "900px" }}
      >
        <h4 className="text-center mb-3 fw-bold mb-2">User List</h4>
        <form>
          <div class="input-group flex-nowrap">
            <input
              type="text"
              class="form-control"
              placeholder="Add Task"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              value={task}
              onChange={(e)=>{setTask(e.target.value)}}
            />
            <button class="btn btn-primary" type="submit" id="addon-wrapping">
              Add+
            </button>
          </div>
        </form>

        {/* Responsive Table Wrapper */}
        <div className="table-responsive ">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Task</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.task}</td>
                    <td className="text-center">
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
