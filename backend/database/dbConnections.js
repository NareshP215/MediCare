import mongoose from "mongoose";

export const dbConnections = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MEDICARE"
    }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log('Error occured while connecting to database', err);
    })
}