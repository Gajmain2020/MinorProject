import express from "express";
import {
  loginAdmin,
  signUp,
  getDetails,
  updateAdmin,
} from "../Controllers/adminControls.js";

const router = express.Router();

router.get("/:id", getDetails); //! middleware needs to be called
router.post("/sign-up", signUp);
router.post("/login", loginAdmin);
router.patch("/update-admin", updateAdmin);

//! studnet Routes.... All require middleware to call and prorceed further....

export default router;
