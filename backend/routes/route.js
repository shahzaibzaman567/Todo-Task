import express from "express";
import {CreateTask,  deleteTask,  getTaskbyId,  getTasks, Login , Register, updateTask} from "../controllar/controllar.js";

export const router = express.Router()

router
.post("/registration", Register)
.post("/login", Login)
.post("/createtask",CreateTask) 
.get("/getTasks",getTasks)
.get("/getTask/:id",getTaskbyId)
.put("/updateTask/:id",updateTask)
.delete("/deleteTask/:id",deleteTask)