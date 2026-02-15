import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema(
  {  
     userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
       task: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model("tasks", TaskSchema);

////  What is signed url ?