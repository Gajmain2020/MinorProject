import express from "express";
import {
  fetchStudentByTG,
  loginTeacher,
  validateSingleStudent,
  validateMultipleStudents,
  fetchClasses,
  fetchStudents,
} from "../Controllers/teacher.controller.js";

const router = express.Router();

router.get("/fetch-student-tg/:id", fetchStudentByTG);
router.get("/fetch-classes", fetchClasses);
router.get("/fetch-students", fetchStudents);
router.post("/login", loginTeacher);
router.patch("/validate-student", validateSingleStudent);
router.patch("/validate-students", validateMultipleStudents);

export default router;
