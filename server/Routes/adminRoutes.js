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
  updateSingleStudent,
  fetchBooks,
  searchBook,
  addSingleBook,
  addMultipleBooks,
  issueBooks,
  deleteBook,
  editBook,
  returnBooks,
} from "../Controllers/adminControls.js";
import { authAdmin } from "../middleware/authentication.js";

const router = express.Router();

router.get("/fetch-admin/:id", getDetails); //! middleware needs to be called
router.post("/sign-up", signUp);
router.post("/login", loginAdmin);
router.patch("/update-admin", updateAdmin);

//! student Routes.... All require middleware to call and prorceed further....
router.get("/student/fetch-students", fetchAllStudents);
router.post("/student/add-individual-student", addIndividualStudent);
router.post("/student/add-multiple-students", addMultipleStudents);
router.patch("/student/update-student", updateSingleStudent);
router.delete("/student/delete-student/:id", deleteSingleStudent);
router.delete("/student/delete-students", deleteMultipleStudents);

//! library Routes.... All require middleware to call and prorceed further ...
router.get("/library/fetch-books", fetchBooks);
router.get("/library/search-book", searchBook);
router.post("/library/add-single-book", authAdmin, addSingleBook);
router.post("/library/add-multiple-books", authAdmin, addMultipleBooks);
router.post("/library/issue-books", issueBooks);
router.patch("/library/edit-book", editBook);
router.patch("/library/return-books", returnBooks);
router.delete("/library/delete-book", deleteBook);

export default router;
