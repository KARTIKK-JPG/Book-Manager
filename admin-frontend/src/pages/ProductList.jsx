import React, { useEffect, useState } from "react";
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      alert("Error deleting product.");
    }
  };

  const handleEdit = (id) => navigate(`/admin/products/edit/${id}`);

  const filteredProducts = products.filter((product) =>
    product.productName?.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-4xl text-center mb-8 font-bold">Books List</h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search books by name..."
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-indigo-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center">No Books found.</p>
      )}

      <hr className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition relative"
          >
            <img
              src={product.productImage || "/no-image.png"}
              alt={product.productName}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-bold mb-1">
              {product.productName}
            </h2>
            <p className="mb-1 text-gray-700">{product.productBrand}</p>
            <p className="text-green-700 font-bold">
              ₹ {product.productPrice}
            </p>
            {product.isBestseller && (
              <span className="text-sm text-red-600 font-semibold">
                Bestseller
              </span>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(product._id)}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                title="Edit"
              >
                <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-400"
                title="Delete"
              >
                <TrashIcon className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
