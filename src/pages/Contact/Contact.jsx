import React, { useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

function ContactUs({ token }) {
  const [form, setForm] = useState({
    Name: "",
    Phone: "",
    Email: "",
    Message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      await axiosClient.post("/contact-us/add-ContactUs", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSuccess("Message sent successfully!");
      setForm({ Name: "", Phone: "", Email: "", Message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setSuccess("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      {/* ----------- TITLE ----------- */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">Get In Touch</h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ut
          maxime corrupti dolores ex rerum iste ipsa.
        </p>
      </div>

      {/* ----------- CONTACT BOXES ----------- */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-gray-100 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
          <FiMapPin className="text-green-600 text-3xl mx-auto mb-3" />
          <p className="font-semibold">102 Street 2714 Donovan</p>
          <p className="text-gray-500 text-sm mt-1">
            Lorem ipsum dolar site amet discont
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
          <FiPhone className="text-green-600 text-3xl mx-auto mb-3" />
          <p className="font-semibold">+02 1234 567 88</p>
          <p className="text-gray-500 text-sm mt-1">
            Lorem ipsum dolar site amet discont
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
          <FiMail className="text-green-600 text-3xl mx-auto mb-3" />
          <p className="font-semibold">info@example.com</p>
          <p className="text-gray-500 text-sm mt-1">
            Lorem ipsum dolar site amet discont
          </p>
        </div>
      </div>

      {/* ----------- FORM SECTION ----------- */}
      <div className="bg-white rounded-2xl shadow-lg p-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold">Send Us</h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Contact us for all your questions and opinions, or solve your
            problems in a shorter time with our contact offices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="Name"
              value={form.Name}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone number
            </label>
            <input
              type="text"
              name="Phone"
              value={form.Phone}
              onChange={handleChange}
              className="w-full bg-gray-100 p-3 rounded outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Your message
            </label>
            <textarea
              name="Message"
              value={form.Message}
              onChange={handleChange}
              rows="4"
              className="w-full bg-gray-100 p-3 rounded outline-none"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-teal-600 w-fit cursor-pointer"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-center font-medium text-green-600">
            {success}
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
