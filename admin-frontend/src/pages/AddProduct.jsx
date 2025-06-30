// src/pages/AddProduct.jsx
import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productBrand: "",
    productPrice: "",
    isBestseller: false,
    productImage: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, productImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("productDescription", formData.productDescription);
      data.append("productBrand", formData.productBrand);
      data.append("productPrice", formData.productPrice);
      data.append("isBestseller", formData.isBestseller);
      data.append("productImage", formData.productImage);

      const token = localStorage.getItem("adminToken");

      const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/product`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setFormData({
        productName: "",
        productDescription: "",
        productBrand: "",
        productPrice: "",
        isBestseller: false,
        productImage: null,
      });
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-16 bg-white rounded shadow">
      <h1 className="text-3xl mx-26 font-bold mb-4">Add New Book</h1>
      {message && (
        <div className="mb-4 text-green-700 font-medium">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="productName"
          placeholder="Book Name"
          value={formData.productName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="productDescription"
          placeholder="Description"
          value={formData.productDescription}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          rows={3}
          required
        />

        <input
          type="text"
          name="productBrand"
          placeholder="Author"
          value={formData.productBrand}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="number"
          name="productPrice"
          placeholder="Price"
          value={formData.productPrice}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isBestseller"
            checked={formData.isBestseller}
            onChange={handleChange}
          />
          Bestseller
        </label>

        <input
          type="file"
          name="productImage"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
