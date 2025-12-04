import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Password: "",
    role: "User",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[400px] mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg mb-12"
    >
      <h2 className="text-center mb-7 text-2xl font-semibold text-gray-800">
        Register
      </h2>
      <label htmlFor="Name" className="block mb-1.5 font-medium text-gray-700">
        Name
      </label>
      <input
        name="Name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md mb-5 text-base outline-none transition-colors border-gray-300 focus:border-teal-500"
      />
      <label htmlFor="Phone" className="block mb-1.5 font-medium text-gray-700">
        Phone
      </label>
      <input
        name="Phone"
        placeholder="Phone"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md mb-5 text-base outline-none transition-colors border-gray-300 focus:border-teal-500"
      />
      <label htmlFor="Email" className="block mb-1.5 font-medium text-gray-700">
        Email
      </label>
      <input
        name="Email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md mb-5 text-base outline-none transition-colors border-gray-300 focus:border-teal-500"
      />
      <label
        htmlFor="Password"
        className="block mb-1.5 font-medium text-gray-700"
      >
        Password
      </label>
      <input
        type="password"
        name="Password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md mb-5 text-base outline-none transition-colors border-gray-300 focus:border-teal-500"
      />

      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg mt-4 transition-colors disabled:opacity-60 cursor-pointer"
      >
        Register
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default Register;
