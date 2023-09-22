import express from "express";
import {
  loginAdmin,
  signUp,
  getDetails,
  updateAdmin,
  addIndividualStudent,
  addMultipleStudents,
  fetchAllStudents,
  deleteSingleStudent,
  deleteMultipleStudents,
} from "../Controllers/adminControls.js";

const router = express.Router();

router.get("/fetch-admin/:id", getDetails); //! middleware needs to be called
router.post("/sign-up", signUp);
router.post("/login", loginAdmin);
router.patch("/update-admin", updateAdmin);

//! studnet Routes.... All require middleware to call and prorceed further....
router.get("/fetch-students", fetchAllStudents);
router.post("/add-individual-student", addIndividualStudent);
router.post("/add-multiple-students", addMultipleStudents);
router.delete("/delete-student/:id", deleteSingleStudent);
router.delete("/delete-students", deleteMultipleStudents);

export default router;
