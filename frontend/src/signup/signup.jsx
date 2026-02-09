import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const [err,setErr] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:4000/registration",
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((result) => {
        
        navigate("/login");
      })
      .catch((err) =>{

        if(err){
         return setErr("Registration failed. This email or username is already taken. Please try another.")
        }
        }
      );
  };



  return (
    <>
      <div
        style={{ height: "88vh", width: "82vw" }}
        className="d-flex align-items-center justify-content-center "
      >
        <form className="col-5 card border-primary" onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <div className="mb-3">
            <b>
              <label htmlFor="name" className="form-label text-start d-block ">
                Name :
              </label>
            </b>
            <input
              type="text"
              className="form-control is-vaild"
              id="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <b>
              {" "}
              <label
                htmlFor="exampleInputEmail1"
                className="form-label d-block text-start "
              >
                Email address :
              </label>
            </b>
            <input
              type="email"
              className="form-control is-vaild"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <b>
              {" "}
              <label
                htmlFor="exampleInputPassword1"
                className="form-label d-block text-start"
              >
                Password :
              </label>
            </b>
            <input
              type="password"
              className="form-control is-vaild"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>
 <p className="text-danger">{ err }</p>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Signup
          </button>
          <Link to={"/login"} type="submit" className="btn btn-primary w-100">
            Login
          </Link>
        </form>
      </div>
    </>
  );
}
