import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../axios/axiosInstance";
import { FaLock, FaTimes, FaKey } from "react-icons/fa";

const EditPasswordModel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditPassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      await api.patch("/user/updatePassword", { password: newPassword });
      toast.success("Password updated successfully");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl shadow">
            <FaLock />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mt-4">
            Change Password
          </h2>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Use a strong password to keep your account secure
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="relative">
            <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              onChange={handleChange}
              value={formData.currentPassword}
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="relative">
            <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              onChange={handleChange}
              value={formData.newPassword}
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="relative">
            <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              onChange={handleChange}
              value={formData.confirmPassword}
              className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleEditPassword}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg hover:opacity-90 transition"
          >
            Update Password
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordModel;
