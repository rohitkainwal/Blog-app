import React, { useContext, useState } from "react";
import { AuthContext } from "./../context/AuthContext";
import toast from "react-hot-toast";
import { api } from "../axios/axiosInstance";
import { FaUser, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";

const EditProfileModel = ({ onClose }) => {
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    contactNumber: user.contactNumber,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditProfile = async () => {
    try {
      const res = await api.patch(
        "/user/updateProfile",
        formData,
        { withCredentials: true }
      );

      toast.success("Profile updated successfully");
      setUser(res.data.user);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl shadow">
            <FaUser />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mt-4">
            Edit Profile
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Update your personal information
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleEditProfile}
            className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModel;
