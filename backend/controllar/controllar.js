import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js";
import jwt from "jsonwebtoken";

export let Login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          return res.json("success");
        } else {
          return res.status(401).json("password is incorrect");
        }
      } else {
        res.json("email not register");
      }
      // Token generate
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
      );

      res.json({ token }); // kick token for fronted
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

export const Register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json("Please fill all fields");
  }

  try {
    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json(`Registration failed : ${error.message}`);
  }
};

export const CreateTask = async (req, res) => {
  const { name, task } = req.body;
  if (!name || !task) return res.status(400).json("Please fill all fields");

  try {
    const newTask = await TaskModel.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTaskbyId = async (req, res) => {
  const id = req.params.id;

  try {
    const Task = await TaskModel.findById({ _id: id });
    res.json(Task);
  } catch (err) {
    res.json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  const id = req.params.id;

  try {
    TaskModel.findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, task: req.body.task },
    )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => res.json(err));
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
      .catch((err) => res.json(err));
  } catch (err) {
    res.json({ error: err.message });
  }
};
