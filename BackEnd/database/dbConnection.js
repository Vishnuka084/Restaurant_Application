import mongoose, { mongo } from "mongoose";

export const dbConnection = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "RESTAURANT"
    }).then(()=>{
        console.log("Connected database succesfully..!");
    }).catch(err=>{
        console.log(`some error occured while connedting to database...! ${err}`);
    })
}

