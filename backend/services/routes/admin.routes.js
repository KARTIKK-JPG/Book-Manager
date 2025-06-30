import express from "express";
import {
  registerAdmin,
  loginAdmin,
  requestPasswordReset,
  resetPassword,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;
