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
  addCourse,
  fetchCoursesByDept,
  deleteCourse,
  editCourse,
  addTeacherToCourse,
  getTimeTable,
  getCoursesByDeptAndSemester,
  addTimeTableToDB,
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
//! Course and Time table routing _______________________________________________________________
router.get("/fetch-courses", fetchCoursesByDept);
router.get("/get-courses-by-dept-semester", getCoursesByDeptAndSemester);
router.post("/add-course", addCourse);
router.delete("/delete-course", deleteCourse);
router.patch("/edit-course", editCourse);
router.patch("/add-teacher-to-course", addTeacherToCourse);

router.get("/get-time-table", getTimeTable);
router.post("/add-time-table", addTimeTableToDB);

//! ___________________________________________________________________________________

export default router;
