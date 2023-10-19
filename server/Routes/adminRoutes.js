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
  getBookDetails,
  returnBooks,
  addIndividualTeacher,
  addMultipleTeachers,
  getStudentDetails,
  fetchAllTeachers,
} from "../Controllers/adminControls.js";
import { authAdmin } from "../middleware/authentication.js";

const router = express.Router();

router.get("/fetch-admin/:id", getDetails); //! middleware needs to be called
router.post("/sign-up", signUp);
router.post("/login", loginAdmin);
router.patch("/update-admin", updateAdmin);

//! student Routes.... All require middleware to call and prorceed further....
router.get("/academics/get-details/:urn", getStudentDetails);
router.get("/academics/fetch-students", fetchAllStudents);
router.post("/academics/add-single-student", addIndividualStudent);
router.post("/academics/add-multiple-students", addMultipleStudents);
router.post("/academics/add-single-teacher", addIndividualTeacher);
router.post("/academics/add-multiple-teachers", addMultipleTeachers);
router.patch("/academics/update-student", updateSingleStudent);
router.delete("/academics/delete-student/:urn", deleteSingleStudent);
router.delete("/academics/delete-students", deleteMultipleStudents);

//! teacher routers ..... all require middleware to call and proceed further...
router.get("/academics/fetch-teachers", fetchAllTeachers);

//! library Routes.... All require middleware to call and prorceed further ...
router.get("/library/fetch-books", fetchBooks);
router.get("/library/get-book-details", getBookDetails);
router.get("/library/search-book", searchBook);
router.post("/library/add-single-book", authAdmin, addSingleBook);
router.post("/library/add-multiple-books", authAdmin, addMultipleBooks);
router.post("/library/issue-books", issueBooks);
router.patch("/library/edit-book", editBook);
router.patch("/library/return-books", returnBooks);
router.delete("/library/delete-book", deleteBook);

export default router;
