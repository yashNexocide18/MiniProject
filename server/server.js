import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authrouter from "./routes/authroutes.js";
import blogrouter from "./routes/blogroutes.js";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://mini-project-sand-one.vercel.app",
    credentials: true,
}));

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const server = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
server();

app.use("/api/authentication", authrouter);
app.use("/api/blogs", blogrouter);
