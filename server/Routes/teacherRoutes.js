import express from "express";
import {
  fetchStudentByTG,
  loginTeacher,
  validateSingleStudent,
  validateMultipleStudents,
} from "../Controllers/teacherControls.js";

const router = express.Router();

router.get("/fetch-student-tg/:id", fetchStudentByTG);
router.post("/login", loginTeacher);
router.patch("/validate-student", validateSingleStudent);
router.patch("/validate-students", validateMultipleStudents);

export default router;
