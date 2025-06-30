import path from "path";
import fs from "fs";
import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productBrand,
      productPrice,
      isBestseller
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const newProduct = await productModel.create({
      productName,
      productDescription,
      productBrand,
      productPrice,
      isBestseller: isBestseller === "true",
      productImage: req.file.path
    });

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// ✅ NEW: GET a single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await productModel.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updates = { ...req.body };

    if (req.file) {
      const oldImagePath = existingProduct.productImage;
      const fullOldPath = path.resolve(oldImagePath);

      if (fs.existsSync(fullOldPath)) {
        fs.unlinkSync(fullOldPath);
      }

      updates.productImage = req.file.path;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imagePath = path.resolve(product.productImage);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Product and image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};
