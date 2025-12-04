import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Phone: "", Password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(formData);
      console.log("Logged in user:", user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[400px] mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg mb-12"
    >
      <h2 className="text-center mb-7 text-2xl font-semibold text-gray-800">
        Login
      </h2>
      <label htmlFor="Phone" className="block mb-1.5 font-medium text-gray-700">
        Phone
      </label>
      <input
        type="text"
        name="Phone"
        placeholder="Phone"
        value={formData.Phone}
        onChange={handleChange}
        className="w-full px-3 py-2 border mb-5 rounded-md text-base outline-none transition-colors border-gray-300 focus:border-teal-500"
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
        value={formData.Password}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md mb-7 text-base outline-none transition-colors border-gray-300 focus:border-teal-500"
      />
      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg mt-4 transition-colors disabled:opacity-60 cursor-pointer"
      >
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default Login;
