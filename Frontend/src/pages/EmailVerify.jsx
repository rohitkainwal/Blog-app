import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaEnvelopeOpenText, FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import { api } from "../axios/axiosInstance";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const EmailVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resendEmailVerify = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address first.");
      return;
    }
    setIsResending(true);

    try {
      await api.post("/user/resend-email-link", { email: formData.email });
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send email");
    } finally {
      setIsResending(false);
    }
  };

  const verify = async () => {
    try {
      const res = await api.get(`/user/verify-email/${token}`);
      toast.success("Email verified! Welcome to WriteHub.");
      navigate("/login");
    } catch (error) {
      toast.error("Verification link expired or invalid.");
    }
  };

  useEffect(() => {
    if (token && token !== ":token") {
      verify();
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      await api.post("/user/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const primaryColor = "rgb(var(--color-primary))";

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 transition-colors duration-500">
      {/* Background Decorative Element */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-20" />

      <div className="w-full max-w-[480px]">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 lg:p-12 shadow-xl border border-zinc-100 dark:border-zinc-800 text-center relative overflow-hidden">
          
          {/* Top Icon */}
          <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-8 transform -rotate-6">
            <FaEnvelopeOpenText size={32} className="text-zinc-400 dark:text-zinc-500" />
          </div>

          <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
            Check your mail
          </h1>
          
          <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-8 leading-relaxed">
            We’ve sent a verification link to your inbox. <br />
            Please click it to activate your <strong>WriteHub</strong> account.
          </p>

          {/* Action Button: Gmail */}
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold shadow-lg hover:-translate-y-1 transition-all mb-8"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
              alt="gmail"
              className="w-5 h-5"
            />
            Open Gmail
          </a>

          <div className="space-y-6">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-zinc-100 dark:border-zinc-800"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-zinc-300 dark:text-zinc-600 uppercase tracking-widest">
                Didn't get it?
              </span>
              <div className="flex-grow border-t border-zinc-100 dark:border-zinc-800"></div>
            </div>

            {/* Resend Section */}
            <div className="space-y-3">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Confirm your email address"
                className="w-full px-5 py-3.5 rounded-xl border-2 border-zinc-50 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 dark:text-white focus:outline-none focus:border-zinc-200 dark:focus:border-zinc-700 transition-all text-sm font-medium"
              />
              <button
                onClick={resendEmailVerify}
                disabled={isResending}
                className="flex items-center justify-center gap-2 w-full text-sm font-bold transition-colors disabled:opacity-50"
                style={{ color: primaryColor }}
              >
                {isResending ? (
                  "Sending Link..."
                ) : (
                  <>
                    <FaPaperPlane size={12} /> Resend verification email
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft size={10} /> Back to Login
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-500 transition-colors"
            >
              <FaSignOutAlt size={14} /> Log out
            </button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-zinc-400 text-xs font-medium">
          Check your spam folder if you can't find the email.
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;