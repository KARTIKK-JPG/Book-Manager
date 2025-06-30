import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:8000/api/v1/admin/forgot-password", {
        adminEmail: email,
      });

      setMessage("Reset link sent to your email.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error sending reset email."
      );
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded shadow dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

export default ForgotPassword;
