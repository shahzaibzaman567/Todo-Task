import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const  [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [err,setErr] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
   
   
    axios
      .post("http://localhost:4000/login",
         { email, password },
       )
      .then((result) => {
        if (result.data.message === "success") {
          const token=result.data.token;
           const userName = result.data.username;
        localStorage.setItem("user",userName)
          localStorage.setItem("token", result.data.token)
          navigate(`/${userName}`);
        }
      })
      .catch((err) => {
       if(err){
        return setErr("Invalid email or password. Please check your credentials and try again.")
       }
      
      });
  };






  return (
    <>
      <div
        style={{ height: "88vh", width: "82vw" }}
        className="d-flex align-items-center justify-content-center "
      >
        <form className="col-5 card border-primary" onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="mb-3">
            <b>
              
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
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <b>
            
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
                value={password}
                minLength={6}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
         
          </div>
<p className="text-danger">{err}</p>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
          <Link
            to={"/registration"}
            type="submit"
            className="btn btn-primary w-100 mb-2"
          >
            Signup
          </Link>
        </form>
      </div>
    </>
  );
}
