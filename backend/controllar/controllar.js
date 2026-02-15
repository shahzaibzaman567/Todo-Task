import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//For Login Route
export let Login = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json("All field required")
  }

  try{
  const user = await UserModel.findOne({email:email});
  if(!user) res.status(404).json({ message: "email not register" })
   const isMatch= await bcrypt.compare(password,user.password)
  if(!isMatch) res.status(401).json({message:"password is wrong"})
 const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
          );

          console.log(user.name)
 return res.json({
            message: "success",
            token: token,
            username: user.name,
          });
  }catch (err){
res.json({message:err.message})
}

  // UserModel.findOne({ email: email })
  // .then((user) => {
      // const user = awa
      // if (user) {
      //   if (user.password === password) {
      //     // Token generate
      //     const token = jwt.sign(
      //       { id: user._id, email: user.email },
      //       process.env.JWT_SECRET,
      //     );
      //     return res.json({
      //       message: "success",
      //       token: token,
      //       username: user.name,
      //     });
      //   } else {
      //     return res.status(401).json("password is incorrect");
      //   }
      // } else {
      //   return res.status(401).json({ message: "email not register" });
      // }
    // })

    // .catch((err) => res.status(500).json({ error: err.message }));
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
    console.log(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.user.id });
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
 await   TaskModel.findByIdAndUpdate(
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
