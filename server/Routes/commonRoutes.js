import express from "express";
import { postComplaint } from "../Controllers/commonControls.js";

const router = express.Router();

router.post("/complain", postComplaint);

export default router;
