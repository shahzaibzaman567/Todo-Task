import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL // Cloud par ye automatic connect hoga
});

redisClient.on("error", (err) => console.log("❌ Redis Error:", err));

// Self-executing function to connect
(async () => {
    await redisClient.connect();
    console.log("⚡ Redis Connected Successfully");
})();

export default redisClient;
