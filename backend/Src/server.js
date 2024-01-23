import { connectDb } from "./Database/Db.js";
import {app} from "./app.js"
import dotenv from "dotenv"

//Config
dotenv.config({path: "./.env"});

//Database
connectDb()
.then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`Server is working on ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})
