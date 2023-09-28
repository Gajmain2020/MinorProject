import express from "express";
import { authAdmin } from "../middleware/authentication.js";
import { getStudentDetails } from "../Controllers/studentControls.js";

const router = express.Router();

router.get("/get-details", getStudentDetails);

export default router;
