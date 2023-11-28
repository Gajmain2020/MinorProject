import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//importing routes from Routes
import adminRoutes from "./Routes/admin.routes.js";
import studentRoutes from "./Routes/student.routes.js";
import teacherRoutes from "./Routes/teacher.routes.js";
import commonRoutes from "./Routes/common.routes.js";
import deptAdminRoutes from "./Routes/deptAdmin.routes.js";

const app = express();

app.use(cors());
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
app.use("/api/teacher", teacherRoutes);
app.use("/api/common", commonRoutes);
app.use("/api/:dept", deptAdminRoutes);
app.use("/api/department", deptAdminRoutes);

mongoose.set({ strictQuery: true });
mongoose.connect("mongodb://localhost:27017/MINOR-PROJECT").then(() => {
  console.log("Database connection established...");
  app.listen(PORT, () => {
    console.log(`Server Running At :: http://localhost:${PORT}`);
  });
});
