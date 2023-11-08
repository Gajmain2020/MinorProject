import express from "express";
import { authAdmin } from "../middleware/authentication.js";
import {
  getStudentDetails,
  loginStudent,
  fetchStudentDetails,
  saveStudentDetails,
} from "../Controllers/studentControls.js";

const router = express.Router();

router.get("/get-details", getStudentDetails);
router.get("/fetch-details", fetchStudentDetails);
router.post("/login", loginStudent);
router.patch("/save-details", saveStudentDetails);

export default router;
