import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productBrand: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    isBestseller: {
        type: Boolean,
        default: false
    },
    productImage: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const productModel = mongoose.model("Product", productSchema)
export default productModel