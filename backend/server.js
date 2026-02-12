import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserModel } from "./models/User.js";
import dotenv from "dotenv"
import { router } from "./routes/route.js";

dotenv.config();

let app = express();
app.use(express.json());

let isConnected=false;

async function connectToMongoDB() {
try{
 await mongoose
.connect(process.env.MY_DB_USER)
 console.log("✅ DB Connected Successfully");
 isConnected=true
}catch(err){
console.log(err)
  }
}
connectToMongoDB()

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/",router)
app.use((req,res,next)=>{
  console.log(req.method, req.url);
  next();
});



  
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});

//do not use app.listen in vercel
export default app