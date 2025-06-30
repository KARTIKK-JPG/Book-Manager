import mongoose from "mongoose";
import 'dotenv/config'

const uri = process.env.DB

if(!uri){
    throw new console.error("Invalid String");
    
}

const db = async()=>{
    try{
        const conn = await mongoose.connect(uri)
        if(!conn)
            return console.log("Connection error")
        console.log("Connected to DB")
    }
    catch(e){
        console.log(e)
    }
    
}

export default db

