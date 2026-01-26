import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "../axios/axiosInstance";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaArrowRight, FaPen, FaBookOpen, FaUsers } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email.trim() ||
      !formData.username.trim() ||
      !formData.password.trim() ||
      !formData.contactNumber.trim()
    ) {
      toast("Please fill all fields!", { icon: "📝" });
      return;
    }

    try {
      const res = await api.post("/user/register", formData);
      toast.success(`✅ ${res.data.message}`);
      setFormData({ username: "", email: "", password: "", contactNumber: "" });
      navigate("/email-verify/:token");
    } catch (error) {
      toast.error(`❌ ${error.response?.data?.message || "Registration failed"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navbar />

      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-6xl flex items-center justify-center gap-12 py-4 mt-13 ">
          
          {/* LEFT SIDE - Illustration & Features */}
          <div className="hidden lg:flex flex-col justify-center w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border-2 shadow-lg animate-pulse" style={{ borderColor: 'rgb(var(--color-primary))' }}>
                <FaPen className="animate-bounce" style={{ color: 'rgb(var(--color-primary))' }} />
                <span className="font-bold text-sm dark:text-white">Start Writing Today</span>
              </div>
              
              <h1 className="text-6xl font-black text-zinc-900 dark:text-white leading-tight">
                Your Stories,<br />
                <span style={{ color: 'rgb(var(--color-primary))' }}>Your Voice</span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-lg">
                Join thousands of writers sharing their creativity on WriteHub
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
                  <FaBookOpen className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Create Unlimited Blogs</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Write, edit, and publish your stories</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
                  <FaUsers className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Connect with Readers</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Build your audience and community</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Signup Form */}
          <div className="w-full lg:w-1/2 max-w-md">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border-2 border-zinc-200 dark:border-zinc-800 p-6 relative overflow-hidden">
              
              {/* Animated background gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-600 to-transparent animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                 
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Join WriteHub</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">Create your writer account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Username */}
                  <div className="relative group">
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 ml-1">
                      USERNAME
                    </label>
                    <div className="relative">
                      <FaUser 
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all ${focusedField === 'username' ? 'scale-110' : ''}`}
                        style={{ color: focusedField === 'username' ? 'rgb(var(--color-primary))' : '#a1a1aa' }}
                        size={14} 
                      />
                      <input
                        type="text"
                        name="username"
                        required
                        onChange={handleChange}
                        onFocus={() => setFocusedField('username')}
                        onBlur={() => setFocusedField(null)}
                        value={formData.username}
                        placeholder="penman_ajay"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all text-sm"
                        style={focusedField === 'username' ? { borderColor: 'rgb(var(--color-primary))', boxShadow: `0 0 0 3px rgba(var(--color-primary), 0.1)` } : {}}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 ml-1">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <FaEnvelope 
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all ${focusedField === 'email' ? 'scale-110' : ''}`}
                        style={{ color: focusedField === 'email' ? 'rgb(var(--color-primary))' : '#a1a1aa' }}
                        size={14} 
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        value={formData.email}
                        placeholder="writer@writehub.com"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all text-sm"
                        style={focusedField === 'email' ? { borderColor: 'rgb(var(--color-primary))', boxShadow: `0 0 0 3px rgba(var(--color-primary), 0.1)` } : {}}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="relative group">
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 ml-1">
                      PASSWORD
                    </label>
                    <div className="relative">
                      <FaLock 
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all ${focusedField === 'password' ? 'scale-110' : ''}`}
                        style={{ color: focusedField === 'password' ? 'rgb(var(--color-primary))' : '#a1a1aa' }}
                        size={14} 
                      />
                      <input
                        type="password"
                        name="password"
                        required
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        value={formData.password}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all text-sm"
                        style={focusedField === 'password' ? { borderColor: 'rgb(var(--color-primary))', boxShadow: `0 0 0 3px rgba(var(--color-primary), 0.1)` } : {}}
                      />
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div className="relative group">
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5 ml-1">
                      CONTACT NUMBER
                    </label>
                    <div className="relative">
                      <FaPhone 
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-all ${focusedField === 'contactNumber' ? 'scale-110' : ''}`}
                        style={{ color: focusedField === 'contactNumber' ? 'rgb(var(--color-primary))' : '#a1a1aa' }}
                        size={14} 
                      />
                      <input
                        type="text"
                        name="contactNumber"
                        required
                        onChange={handleChange}
                        onFocus={() => setFocusedField('contactNumber')}
                        onBlur={() => setFocusedField(null)}
                        value={formData.contactNumber}
                        placeholder="+1 234 567 890"
                        className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-all text-sm"
                        style={focusedField === 'contactNumber' ? { borderColor: 'rgb(var(--color-primary))', boxShadow: `0 0 0 3px rgba(var(--color-primary), 0.1)` } : {}}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-4 group"
                    style={{ backgroundColor: 'rgb(var(--color-primary))' }}
                  >
                    Create Account 
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-5 text-center">
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                    Already have an account?{" "}
                    <Link 
                      to="/login" 
                      className="font-bold hover:underline transition-all"
                      style={{ color: 'rgb(var(--color-primary))' }}
                    >
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-zinc-500 dark:text-zinc-500 mt-3">
              By signing up, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;