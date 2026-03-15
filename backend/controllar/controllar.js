import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import uploadImage from "../uploadimage.js";
import redisClient from "../config/redis.js";

//For Login Route
export let Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("All field required");
  }

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "email not register" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "password is wrong" });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
    );

    return res.json({
      message: "success",
      token: token,
      username: user.name,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const Register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json("Please fill all fields");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json(`Registration failed : ${error.message}`);
  }
};

export const CreateTask = async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json("Please fill all fields");

  try {
    const newTask = await TaskModel.create({ task, userId: req.user.id });
     await redisClient.del(`tasks:${req.user.id}`)
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const cachedTasks = await redisClient.get(`tasks:${userId}`);

    if (cachedTasks) {
      console.log("Tasks from Redis ⚡");
      return res.json(JSON.parse(cachedTasks));
    }

const tasks = await TaskModel.find({ userId });
    await redisClient.set(`tasks:${userId}`, JSON.stringify(tasks), { EX: 60 })

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskbyId = async (req, res) => {
  const id = req.params.id;

  try {
    const cachedTask = await redisClient.get(`task:${id}`);
   
    if (cachedTask) {
      console.log("Single Task from Redis ⚡");
      return res.json(JSON.parse(cachedTask));
    }

    const Task = await TaskModel.findById({ _id: id });
    if (!Task) return res.status(404).json({ message: "Not found" });
     await redisClient.set(

      `task:${id}`,
      JSON.stringify(task),
      { EX: 60 }
    );
  
    res.json(Task);

  } catch (err) {
    res.json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const id = req.params.id;

  try {
    await TaskModel.findByIdAndUpdate(
      { _id: id },
      { task: req.body.task },
    )
      .then((result) => {
        res.json(result);
      })
      await redisClient.del(`tasks:${req.user.id}`);
await redisClient.del(`task:${id}`);
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;

  try {
    TaskModel.findByIdAndDelete({ _id: id })
      .then((result) => {
        res.json(result);
      })
await redisClient.del(`tasks:${req.user.id}`);
await redisClient.del(`task:${id}`);
  } catch (err) {
    res.json({ error: err.message });
  }

};

export let uploadimage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("No image data provided");
    const url = await uploadImage(image);
    res.status(200).json(url);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message || "intenal server err");
  }
};
