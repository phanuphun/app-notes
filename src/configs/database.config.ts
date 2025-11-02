import mongoose from "mongoose";

const mongoURI =
    process.env.MONGO_URL ||
    'mongodb://localhost:27017/appNote';

async function connectDatabase() {
    let conn = await mongoose.connect(mongoURI);
    return conn;
}

const mongoDbConnect = connectDatabase().then(() => {
    return "Database: connected successfully";
}).catch((err) => {
    console.error("DB ERROR=", err);
    return "Database: connection error";
});


export default mongoDbConnect;