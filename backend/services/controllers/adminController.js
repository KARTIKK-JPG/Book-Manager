import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import adminModel from "../models/adminModel.js";
import { sendEmail } from "../utilities/sendEmail.js";

const SECRET_KEY = process.env.SECRET_KEY;

// ------------------------
// REGISTER ADMIN
// ------------------------
export const registerAdmin = async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    const existingAdmin = await adminModel.findOne({ adminEmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(adminPassword, salt);

    const newAdmin = new adminModel({
      adminName,
      adminEmail,
      adminPassword: hashPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (e) {
    console.error("Error during registration:", e);
    res.status(500).json({ message: "Registration Failed", error: e.message });
  }
};

// ------------------------
// LOGIN ADMIN
// ------------------------
export const loginAdmin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;

    const admin = await adminModel.findOne({ adminEmail });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.adminEmail,
        role: admin.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    console.error("Login Error:", e);
    res.status(500).json({ message: "Login failed", error: e.message });
  }
};

// ------------------------
// FORGOT PASSWORD - SEND RESET LINK
// ------------------------
export const requestPasswordReset = async (req, res) => {
  try {
    const { adminEmail } = req.body;

    const admin = await adminModel.findOne({ adminEmail });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes validity

    admin.resetToken = resetToken;
    admin.resetTokenExpiry = resetTokenExpiry;
    await admin.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const html = `
      <h3>Password Reset Request</h3>
      <p>Hello ${admin.adminName},</p>
      <p>You requested to reset your password.</p>
      <p>Click the link below to reset:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 30 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail(adminEmail, "Reset Your Password", html);

    console.log("Reset password link sent:", resetLink);

    res.status(200).json({
      message: "Password reset link sent to email.",
      resetLink, // optional
    });
  } catch (e) {
    console.error("Forgot Password Error:", e);
    res.status(500).json({
      message: "Error processing password reset",
      error: e.message,
    });
  }
};

// ------------------------
// RESET PASSWORD
// ------------------------
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const admin = await adminModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.adminPassword = hashedPassword;
    admin.resetToken = undefined;
    admin.resetTokenExpiry = undefined;

    await admin.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (e) {
    console.error("Reset Password Error:", e);
    res.status(500).json({ message: "Error resetting password", error: e.message });
  }
};
