import express from "express";
import {
  registerAdmin,
  loginAdmin,
  requestPasswordReset,
  resetPassword,
} from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.post("/register", registerAdmin);
adminRoutes.post("/login", loginAdmin);
adminRoutes.post("/forgot-password", requestPasswordReset);
adminRoutes.post("/reset-password/:token", resetPassword);

export default adminRoutes;
