import mongoose from "mongoose";
import {DB_Name} from "../constants.js"

const connectDb = async()=>{

try {

   const connectInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_Name}`)
   console.log(`Database is Connected !!! ${connectInstance.connection.host}`);

    
} catch (error) {
    console.log("Database is not Connected",error);
    process.exit(1);
}

}

export {connectDb}