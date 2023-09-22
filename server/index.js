import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//importing routes from Routes
import adminRoutes from "./Routes/adminRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";
import facultyRoutes from "./Routes/facultyRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
    credentials: true, // Allow cookies to be sent
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("files"));
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

//use routes for different api calls
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);

mongoose.set({ strictQuery: true });
mongoose.connect("mongodb://localhost:27017/MINOR-PROJECT").then(() => {
  console.log("Database connection established...");
  app.listen(PORT, () => {
    console.log(`Server Running At :: http://localhost:${PORT}`);
  });
});
