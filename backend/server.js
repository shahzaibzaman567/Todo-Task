import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import { router } from "./routes/route.js";
import { createClient } from "redis";
dotenv.config();
// create redis client to connect to to redis server 
let reidsClient;
(
  async()=>{
    redisClient=redis.createClient()
    redis.on("err",(err)=>{
      console.log(err)
    })
    await redisClient.connect()
  }
)


let app = express();
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173","https://todo-task-p7fu.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

let isConnected=false;
 

async function connectToMongoDB() {
try{
 mongoose.connect(process.env.MY_DB_USER)
console.log("✅ DB Connected Successfully")
 isConnected=true
}catch(err){
console.log(err)
  }
}
connectToMongoDB()

// app.get("/check",(req,res)=>{
//   // check if data is alredy cached 
//   const cachedData = redisClient.get("calculate")
//   if(cachedData){
//     return  res.send({data:calculate})
//   }
//   let calculate=0;
//   try{

//     for(let i=0 ; i<10000000000 ; i++){
//     calculate+=1
//   }
// }catch(err){
//   console.log(err)
// }
// res.send({data:calculate})
// }) 
app.use("/api",router)
app.use((req,res,next)=>{
  console.log(req.method, req.url);
  next();
});



  
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT} `);
});

//do not use app.listen in vercel
export default app