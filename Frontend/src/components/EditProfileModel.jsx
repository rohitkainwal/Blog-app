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
      const res = await api.patch("/user/updateProfile", formData);

      toast.success("Profile updated successfully");
      setUser(res.data.data);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4">
      <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 animate-fadeIn transition-all duration-300">
        
        {/* Glassmorphism overlay effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent dark:from-gray-800/40 pointer-events-none"></div>
        
        {/* Content wrapper */}
        <div className="relative z-10">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <FaTimes size={14} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl shadow-lg backdrop-blur-sm border-4 border-white/30 dark:border-gray-800/30 transition-all"
              style={{
                background: `linear-gradient(135deg, rgba(var(--color-primary), 0.8), rgba(var(--color-primary), 1))`,
                boxShadow: `0 10px 30px rgba(var(--color-primary), 0.3)`
              }}
            >
              <FaUser className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mt-5 transition-all">
              Edit Profile
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium transition-colors">
              Update your personal information
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            
            {/* Username */}
            <div className="relative group">
              <div 
                className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10"
                style={{ color: `rgb(var(--color-primary))` }}
              >
                <FaUser size={16} />
              </div>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md focus:bg-white/80 dark:focus:bg-gray-800/80"
                style={{
                  '--tw-ring-color': `rgba(var(--color-primary), 0.5)`
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = `rgb(var(--color-primary))`;
                  e.target.style.boxShadow = `0 0 0 3px rgba(var(--color-primary), 0.1)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div 
                className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10"
                style={{ color: `rgb(var(--color-primary))` }}
              >
                <FaEnvelope size={16} />
              </div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md focus:bg-white/80 dark:focus:bg-gray-800/80"
                onFocus={(e) => {
                  e.target.style.borderColor = `rgb(var(--color-primary))`;
                  e.target.style.boxShadow = `0 0 0 3px rgba(var(--color-primary), 0.1)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}
              />
            </div>

            {/* Phone */}
            <div className="relative group">
              <div 
                className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10"
                style={{ color: `rgb(var(--color-primary))` }}
              >
                <FaPhone size={16} />
              </div>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none transition-all duration-200 shadow-sm hover:shadow-md focus:bg-white/80 dark:focus:bg-gray-800/80"
                onFocus={(e) => {
                  e.target.style.borderColor = `rgb(var(--color-primary))`;
                  e.target.style.boxShadow = `0 0 0 3px rgba(var(--color-primary), 0.1)`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="w-1/2 py-3.5 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Cancel
            </button>

            <button
              onClick={handleEditProfile}
              className="w-1/2 py-3.5 rounded-2xl text-white font-bold backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: ` rgb(var(--color-primary))`,
                boxShadow: `0 10px 25px rgba(var(--color-primary), 0.3)`
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 15px 35px rgba(var(--color-primary), 0.4)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = `0 10px 25px rgba(var(--color-primary), 0.3)`;
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModel;