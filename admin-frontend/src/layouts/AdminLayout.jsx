// src/layouts/AdminLayout.jsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="flex flex-col items-center mb-2">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          <h2 className="text-2xl font-bold">Books Manager</h2>
        </div>
        <h2 className="text-lg mx-10 mb-4 font-serif">Only For Admins</h2>
        <hr className="bg-white mb-6" />

        <nav className="space-y-2 mb-4">
          <Link
            to="/admin/about"
            className="block hover:bg-gray-700 px-3 py-2 rounded text-xl font-semibold"
          >
            About Us
          </Link>
          <Link
            to="/admin/add-product"
            className="block hover:bg-gray-700 px-3 py-2 rounded text-xl font-semibold"
          >
            Add Books
          </Link>
          <Link
            to="/admin/products"
            className="block hover:bg-gray-700 px-3 py-2 rounded text-xl font-semibold"
          >
            List Books
          </Link>

        </nav>

        {/* Logout Button below nav links */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 my-26 rounded font-semibold transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
