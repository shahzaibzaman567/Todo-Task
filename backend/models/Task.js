import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    task: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model("tasks", TaskSchema);
