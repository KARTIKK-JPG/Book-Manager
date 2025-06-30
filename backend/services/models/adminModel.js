import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
    trim: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetToken: String,
  resetTokenExpiry: Date,
});

const adminModel = mongoose.model("Admin", adminSchema);
export default adminModel;
