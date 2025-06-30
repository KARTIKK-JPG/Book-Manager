import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./layouts/AdminLayout";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import { About } from "./pages/About";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/admin" element={<AdminLayout />}>
        {/* default page when /admin is visited */}
        <Route index element={<Navigate to="/admin/about" replace />} />

        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<ProductList />} />
        <Route path="about" element={<About />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
