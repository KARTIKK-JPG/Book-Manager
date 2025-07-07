// ✅ EditProduct.jsx - Fixed localhost URLs
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(res.data.product);
      setLoading(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error fetching product");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error updating product.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="productName"
            value={product.productName || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="productDescription"
            value={product.productDescription || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          ></textarea>
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <input
            type="text"
            name="productBrand"
            value={product.productBrand || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="productPrice"
            value={product.productPrice || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
  
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isBestseller"
            checked={product.isBestseller || false}
            onChange={(e) =>
              setProduct({
                ...product,
                isBestseller: e.target.checked,
              })
            }
          />
          <label className="text-sm">Bestseller</label>
        </div>
  
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
  
}

export default EditProduct;