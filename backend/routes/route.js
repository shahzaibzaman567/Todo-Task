import express from "express";
import {CreateTask,  deleteTask,  getTaskbyId,  getTasks, Login , Register, updateTask, uploadimage} from "../controllar/controllar.js";
import { AuthenticateToken } from "../middlewere/auth.js";

export const router = express.Router()

router
.post("/registration",Register)
.post("/login",Login)
.post("/createtask", AuthenticateToken ,CreateTask) 
.get("/getTasks", AuthenticateToken ,getTasks)
.post("/uploadImage", AuthenticateToken , uploadimage )
.get("/getTask/:id", AuthenticateToken ,getTaskbyId)
.put("/updateTask/:id", AuthenticateToken ,updateTask)
.delete("/deleteTask/:id", AuthenticateToken ,deleteTask)