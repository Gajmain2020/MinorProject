import express from "express";
import {
  fetchDeptTeacher,
  assignSingleTG,
  assignMultipleTG,
  removeMultipleTG,
  removeSingleTG,
  fetchDeptStudents,
  fetchDeptTGs,
  assignTgToStudent,
  assignTgToStudents,
} from "../Controllers/deptAdmin.js";

const router = express.Router();

// !Teacher TG Routes ________________________________________________________________
router.get("/fetch-teachers/:dept", fetchDeptTeacher);
router.get("/fetch-tgs/:dept", fetchDeptTGs);
router.patch("/assign-single-tg", assignSingleTG);
router.patch("/assign-multiple-tg", assignMultipleTG);
router.patch("/remove-single-tg", removeSingleTG);
router.patch("/remove-multiple-tg", removeMultipleTG);
//! ___________________________________________________________________________________

//! Student TG Routings _______________________________________________________________
router.get("/fetch-students/:dept", fetchDeptStudents);
router.patch("/assign-student-to-tg", assignTgToStudent);
router.patch("/assign-students-to-tg", assignTgToStudents);
//! ___________________________________________________________________________________

export default router;
