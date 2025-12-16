import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEnvelope, FaUser, FaCommentDots, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully 🚀");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />

      {/* Header */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Have questions, feedback, or suggestions? We’d love to hear from you.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Get in Touch
          </h2>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
              <FaEnvelope />
            </div>
            <div>
              <p className="font-semibold text-gray-700">Email</p>
              <p className="text-gray-600">support@yourblog.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
              <FaPhoneAlt />
            </div>
            <div>
              <p className="font-semibold text-gray-700">Phone</p>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            We aim to respond to all messages within 24 hours. Your feedback
            helps us improve and grow our community.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <div className="relative">
                <FaCommentDots className="absolute left-4 top-4 text-green-500" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
