import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { api } from "../axios/axiosInstance";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { token } = useParams();
  const primaryColor = "rgb(var(--color-primary))";

  const validatePassword = () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return false;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      toast.error("Include uppercase, lowercase, and a number");
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsLoading(true);
    try {
      await api.post(`/user/reset-password/${token}`, {
        password: newPassword,
      });
      toast.success("Password updated successfully!");
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed. Link may be expired.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl p-10 w-full max-w-md border-2 border-zinc-200 dark:border-zinc-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"></div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl mb-6 transform rotate-3">
            <FaCheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">All set!</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 leading-relaxed">
            Your password has been successfully updated. <br />
            You can now sign in to your writer dashboard.
          </p>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors duration-500">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border-2 border-zinc-200 dark:border-zinc-800 p-8 lg:p-10 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-600 to-transparent animate-pulse"></div>

          <div className="relative z-10">
            <Link
              to="/login"
              className="inline-flex items-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors font-bold text-xs tracking-widest group"
            >
              <IoArrowBack className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              BACK TO LOGIN
            </Link>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">New Password</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Create a secure password for your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password Field */}
              <div className="relative group">
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 ml-1 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <FaLock 
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all ${focusedField === 'new' ? 'scale-110' : ''}`}
                    style={{ color: focusedField === 'new' ? primaryColor : '#a1a1aa' }}
                    size={14} 
                  />
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => setFocusedField('new')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none transition-all text-sm font-medium"
                    style={focusedField === 'new' ? { borderColor: primaryColor, boxShadow: `0 0 0 3px rgba(var(--color-primary), 0.1)` } : {}}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative group">
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 ml-1 uppercase tracking-wider">
                  Confirm New Password
                </label>
                <div className="relative">
                  <FaLock 
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all ${focusedField === 'confirm' ? 'scale-110' : ''}`}
                    style={{ color: focusedField === 'confirm' ? primaryColor : '#a1a1aa' }}
                    size={14} 
                  />
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none transition-all text-sm font-medium"
                    style={focusedField === 'confirm' ? { borderColor: primaryColor, boxShadow: `0 0 0 3px rgba(var(--color-primary), 0.1)` } : {}}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                style={{ backgroundColor: primaryColor }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Update Password 
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              <FaShieldAlt className="w-3.5 h-3.5 mr-2" />
              Identity Verified Link
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;