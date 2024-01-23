import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({extended: true , limit: "16kb"}))

app.use(express.static("Public"));

app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));  

//Router 
import userRouter from "./Routes/user.route.js"

app.use("/api/v1/user",userRouter);


export {app}