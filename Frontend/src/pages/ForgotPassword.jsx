import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  FaRegEnvelope,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaKey
} from "react-icons/fa";
import { api } from "../axios/axiosInstance";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address");

    setIsLoading(true);
    try {
      const res = await api.post("/user/forgot-password", { email });
      toast.success(res.data.message);
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const primaryColor = "rgb(var(--color-primary))";

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors duration-500">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl p-10 w-full max-w-md border-2 border-zinc-200 dark:border-zinc-800 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"></div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl mb-6 transform rotate-3">
            <FaCheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Check Your Mail</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8 leading-relaxed">
            We've sent recovery instructions to <br />
            <span className="text-zinc-900 dark:text-zinc-200 font-bold">{email}</span>
          </p>
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            <IoArrowBack /> Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors duration-500">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border-2 border-zinc-200 dark:border-zinc-800 p-8 lg:p-10 relative overflow-hidden">
          
          {/* Animated background gradient shimmer from your reference */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-600 to-transparent animate-pulse"></div>

          <div className="relative z-10">
            <Link
              to="/login"
              className="inline-flex items-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors font-bold text-xs tracking-widest group"
            >
              <IoArrowBack className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              BACK TO LOGIN
            </Link>

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-2xl mb-4 transform -rotate-6 transition-transform hover:rotate-0 duration-300">
                <FaKey className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Password Reset</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Enter your email to recover your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 ml-1 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <FaRegEnvelope 
                    className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all ${focusedField === 'email' ? 'scale-110' : ''}`}
                    style={{ color: focusedField === 'email' ? primaryColor : '#a1a1aa' }}
                    size={16} 
                  />
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="writer@writehub.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all text-sm font-medium"
                    style={focusedField === 'email' ? { borderColor: primaryColor, boxShadow: `0 0 0 3px rgba(var(--color-primary), 0.1)` } : {}}
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
                    Send Reset Link 
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              <FaShieldAlt className="w-3.5 h-3.5 mr-2" />
              Secure Recovery Protocol
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 dark:text-zinc-500 mt-4">
          Remembered your password? <Link to="/login" className="font-bold hover:underline" style={{ color: primaryColor }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;