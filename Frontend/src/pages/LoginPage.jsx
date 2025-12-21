import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../axios/axiosInstance";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";



const LoginPage = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/user/login", formData, { withCredentials: true });
      await fetchUser();
     
      navigate("/");
  
    } catch (error) {
      toast.error(`❌ ${error.response?.data?.message}`);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navbar />

      {/* TWO COLUMN LAYOUT */}
      <div className="flex justify-center items-center py-8 px-4 lg:py-12">
        <div className="bg-white/90 backdrop-blur-lg w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden grid lg:grid-cols-2">
          
          {/* LEFT SIDE - IMAGE SECTION */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-12 flex-col justify-between">
            {/* Decorative circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <FaSignInAlt className="text-white text-3xl" />
              </div>
              <h1 className="text-4xl font-black text-white mb-4 leading-tight">
                Welcome Back!
              </h1>
              <p className="text-green-50 text-lg font-medium leading-relaxed">
                Sign in to continue your journey and access all your personalized features.
              </p>
            </div>

            {/* Illustration/Image Area */}
            <div className="relative z-10 flex items-center justify-center my-8">
              <div className="w-full h-64 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border-2 border-white/20">
                <svg className="w-48 h-48 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>

            {/* Features List */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✓</span>
                </div>
                <span className="font-medium">Secure authentication</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✓</span>
                </div>
                <span className="font-medium">Access from anywhere</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✓</span>
                </div>
                <span className="font-medium">Trusted by thousands</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM SECTION */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Decorative Circle - Mobile Only */}
            <div className="flex justify-center mb-6 lg:hidden">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <FaSignInAlt className="text-white text-3xl" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Login
            </h2>
            <p className="text-gray-600 mt-2 font-medium">
              Welcome back! Please login to your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                  <FaEnvelope className="text-green-600" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Enter your email"
                  className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                  <FaLock className="text-green-600" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full mt-2 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Login
              </button>
            </form>

            {/* Signup Redirect */}
            <p className="text-center text-gray-600 mt-6 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-green-600 font-bold hover:text-green-700 hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;