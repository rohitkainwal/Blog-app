import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../axios/axiosInstance";
import { FaLock, FaTimes, FaKey, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";

const EditPasswordModel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const primaryColor = "rgb(var(--color-primary))";

  const handleEditPassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      await api.patch("/user/updatePassword", { password: newPassword });
      toast.success("Security credentials updated");
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const renderInput = (name, label, fieldKey) => (
    <div className="relative group">
      <label className="block text-[10px] font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <FaKey 
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all ${focusedField === fieldKey ? 'scale-110' : ''}`}
          style={{ color: focusedField === fieldKey ? primaryColor : '#a1a1aa' }}
          size={14} 
        />
        <input
          name={name}
          type={showPasswords[fieldKey] ? "text" : "password"}
          placeholder="••••••••"
          onChange={handleChange}
          onFocus={() => setFocusedField(fieldKey)}
          onBlur={() => setFocusedField(null)}
          value={formData[name]}
          className="w-full pl-11 pr-12 py-3 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all text-sm font-medium"
          style={focusedField === fieldKey ? { borderColor: primaryColor, boxShadow: `0 0 0 3px rgba(var(--color-primary), 0.1)` } : {}}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(fieldKey)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          {showPasswords[fieldKey] ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-zinc-900/40 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] px-4 animate-in fade-in duration-300">
      <div className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] shadow-2xl border-2 border-zinc-200 dark:border-zinc-800 p-8 lg:p-10 animate-in zoom-in-95 duration-300 overflow-hidden">
        
        {/* Top Shimmer Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-600 to-transparent animate-pulse"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-90"
        >
          <FaTimes size={18} />
        </button>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 transform rotate-3 mb-4">
              <FaLock style={{ color: primaryColor }} size={24} />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Security Settings
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-medium uppercase tracking-wider">
              Update your account credentials
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {renderInput("currentPassword", "Current Password", "current")}
            {renderInput("newPassword", "New Password", "new")}
            {renderInput("confirmPassword", "Confirm New Password", "confirm")}

            {/* Strength Indicator */}
            {formData.newPassword && (
              <div className="px-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Strength</span>
                  <span className="text-[10px] font-black text-zinc-900 dark:text-zinc-200 uppercase">
                    {formData.newPassword.length < 8 ? 'Weak' : 'Strong'}
                  </span>
                </div>
                <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((formData.newPassword.length / 12) * 100, 100)}%`,
                      backgroundColor: formData.newPassword.length < 8 ? '#f87171' : primaryColor
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleEditPassword}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: primaryColor }}
            >
              Update Credentials
            </button>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-transparent text-zinc-400 dark:text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Discard Changes
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
            <FaShieldAlt className="mr-2" />
            WriteHub Security Protocol
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPasswordModel;