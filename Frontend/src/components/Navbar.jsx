import ProfileDropdown from "./ProfileDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPowerOff, FaEdit, FaBookReader } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { api } from "./../axios/axiosInstance";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await api.post("/user/logout", {}, { withCredentials: true });
      toast.success("logout success");
      setUser(null);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="bg-gradient-to-r from-green-100 via-emerald-100 to-green-100 flex justify-between items-center h-24 px-10 shadow-xl border-b-2 border-green-200 sticky top-0 z-50 backdrop-blur-sm">
      <Link to="/">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <FaBookReader className="text-white text-2xl" />
          </div>
          <div>
            <div className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 tracking-wide">
              WriteHub
            </div>
            <div className="text-xs text-gray-600 font-medium -mt-1">
              Share Your Story
            </div>
          </div>
        </div>
      </Link>

      {pathname !== "/login" && pathname !== "/signup" && (
        <nav className="flex gap-8 font-bold text-green-700 uppercase">
          <Link
            to="/"
            className={`hover:text-emerald-600 transition-colors duration-200 hover:scale-105 transform relative ${
              pathname === "/" ? "text-emerald-600" : ""
            }`}
          >
            Home
            {pathname === "/" && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
            )}
          </Link>
         
          <Link
            to="/about"
            className={`hover:text-emerald-600 transition-colors duration-200 hover:scale-105 transform relative ${
              pathname === "/about" ? "text-emerald-600" : ""
            }`}
          >
            About
            {pathname === "/about" && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
            )}
          </Link>

          <Link
            to="/contact"
            className={`hover:text-emerald-600 transition-colors duration-200 hover:scale-105 transform relative ${
              pathname === "/contact" ? "text-emerald-600" : ""
            }`}
          >
            Contact Us
            {pathname === "/contact" && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
            )}
          </Link>
        </nav>
      )}

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-green-200 to-emerald-200 rounded-2xl hover:from-green-300 hover:to-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl border border-green-300">
              <img
                src={
                  user.avatar ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                }
                alt={user.username}
                className="w-11 h-11 rounded-full border-3 border-white shadow-md"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-gray-800">
                  {user.username}
                </p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 p-2.5 rounded-full shadow-lg transition-all duration-300 flex items-center hover:scale-110 transform"
              >
                <FaPowerOff size={16} />
              </button>

              <ProfileDropdown />
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
