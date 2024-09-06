import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import cors from "cors"; 


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // if you are using credentials (cookies, HTTP authentication)
  }));
  
app.use(express.json())
app.use(cookieParser())

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", authRoute);

app.listen(8800, () => {
    console.log("Server is up and running!"); 
});