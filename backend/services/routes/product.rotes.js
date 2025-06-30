import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multerConfig.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/product", verifyAdmin, upload.single("productImage"), addProduct);
router.get("/products", verifyAdmin, getAllProducts);
router.get("/product/:id", verifyAdmin, getProductById);
router.patch("/product/:id", verifyAdmin, upload.single("productImage"), updateProduct);
router.delete("/product/:id", verifyAdmin, deleteProduct);

export default router;
