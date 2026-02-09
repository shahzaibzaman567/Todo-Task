import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask(task) {
  const [task, setTask] = useState("");
   const navigate = useNavigate(); 
   const token = localStorage.getItem("token")
   const userName = localStorage.getItem("user")

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/createTask",
         { name, task },
        {
          headers:{
             Authorization: `Bearer ${token}`
        }
      }
        )
      .then((result) => {

        navigate(`/user/${userName}`)
      }
    )
      .catch((err) => console.log(err));
     
  };

 }
