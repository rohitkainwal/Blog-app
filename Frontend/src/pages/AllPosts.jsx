import React, { useContext, useState, useRef, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import { MdOutlineColorLens } from "react-icons/md";
import {
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaPlus,
  FaSearch,
  FaUserEdit,
  FaLock,
  FaSignOutAlt,
  FaThLarge,
  FaPenNib,
} from "react-icons/fa";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import { Link } from "react-router-dom";
import ThemeColorPicker from "../components/ThemeColorPicker";

const AllPosts = () => {
  const { posts } = useContext(PostContext);
  const { user, logout, loading } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("posts"); // posts | create
    const [isPickerOpen, setIsPickerOpen] = useState(false);

  

  const userMenuRef = useRef(null);


  /* -------- CLOSE USER MENU ON OUTSIDE CLICK -------- */

    // 🌗 Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center dark:bg-zinc-950 dark:text-white">
        Loading...
      </div>
    );

  const avatarInitial =
    user?.fullName?.charAt(0) || user?.username?.charAt(0) || "?";

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <Link to="/">
          <div className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-500 p-[2px] group-hover:scale-110 transition-transform">
              <div
                className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center font-extrabold text-lg"
                style={{ color: `rgb(var(--color-primary))` }}
              >
                W
              </div>
            </div>
            <div className="leading-tight">
              <h1 className="text-xl md:text-2xl font-extrabold dark:text-white">WriteHub</h1>
              <p className="text-xs text-zinc-500 hidden sm:block">Where ideas come alive</p>
            </div>
          </div>
        </Link>
            <button
              className="lg:hidden dark:text-white"
              onClick={() => setIsDrawerOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            <button
              onClick={() => {
                setActiveView("create");
                setIsDrawerOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#6eb300] text-white font-bold shadow-lg"
            >
              <FaPlus size={12} /> New Blog
            </button>

            <button
              onClick={() => {
                setActiveView("posts");
                setIsDrawerOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold ${
                activeView === "posts"
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              <FaThLarge size={14} /> All Blogs
            </button>

            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <FaPenNib size={14} /> My Drafts
            </button>
          </nav>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        {/* -------- TOP BAR -------- */}
        <header className="h-20 sticky top-0 z-[60] px-6 flex items-center justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
  
  {/* LEFT: Menu & Search */}
  <div className="flex items-center gap-4">
    <button
      className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors dark:text-white"
      onClick={() => setIsDrawerOpen(true)}
    >
      <FaBars size={20} />
    </button>

    <div className="relative hidden md:block group">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[rgb(var(--color-primary))] transition-colors" />
      <input
        placeholder="Search blogs..."
        className="pl-10 pr-4 py-2 w-64 rounded-full bg-zinc-100 dark:bg-zinc-800 dark:text-white outline-none focus:ring-2 ring-[rgb(var(--color-primary))/20] border border-transparent focus:border-[rgb(var(--color-primary))] transition-all"
      />
    </div>
  </div>

  {/* RIGHT: Tools & User */}
  <div className="flex items-center gap-3 md:gap-6">
    
    {/* 🎨 COLOR PICKER */}
    <div className="relative">
      <button
        onClick={() => setIsPickerOpen(!isPickerOpen)}
        className="p-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        style={{ color: `rgb(var(--color-primary))` }}
        title="Change Theme Color"
      >
        <MdOutlineColorLens size={22} />
      </button>
      
      {isPickerOpen && (
        <div className="absolute right-0 mt-3 z-50">
           <ThemeColorPicker close={() => setIsPickerOpen(false)} />
        </div>
      )}
    </div>

    {/* 🌗 THEME TOGGLE SWITCH */}
    <button
      onClick={() => setIsDark(!isDark)}
      className="w-14 h-7 flex items-center rounded-full bg-zinc-200 dark:bg-zinc-700 p-1 transition-colors duration-300 relative shadow-inner"
    >
      <div
        className={`absolute w-5 h-5 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md ${
          isDark 
            ? "translate-x-7 bg-zinc-900" 
            : "translate-x-0 bg-yellow-500"
        }`}
      >
        {isDark ? <FaMoon size={10} /> : <FaSun size={10} />}
      </div>
    </button>

    {/* 👤 USER MENU */}
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="w-10 h-10 rounded-full bg-[rgb(var(--color-primary))] hover:brightness-110 text-white font-bold uppercase transition-all shadow-md flex items-center justify-center border-2 border-white dark:border-zinc-800"
      >
        {avatarInitial}
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b border-zinc-50 dark:border-zinc-800 mb-1">
            <p className="font-bold text-sm dark:text-white truncate">
              {user?.username}
            </p>
            <p className="text-[11px] text-zinc-500 truncate uppercase tracking-tighter">
              {user?.email}
            </p>
          </div>

          <div className="space-y-1">
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
              <FaUserEdit className="text-zinc-400" /> Edit Profile
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">
              <FaLock className="text-zinc-400" /> Security
            </button>
          </div>

          <div className="border-t border-zinc-50 dark:border-zinc-800 mt-2 pt-2">
            <Link to="/" onClick={logout}>
              <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <FaSignOutAlt /> Sign Out
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  </div>
</header>

        {/* -------- CONTENT -------- */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* CREATE POST */}
          {activeView === "create" && <CreatePost />}

          {/* ALL POSTS */}
          {activeView === "posts" &&
            (posts?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PostCard />
              </div>
            ) : (
              <div className="text-center py-24">
                <FaPenNib size={40} className="mx-auto text-zinc-300 mb-4" />
                <h2 className="text-xl font-bold dark:text-white">
                  No blogs yet
                </h2>
                <button
                  onClick={() => setActiveView("create")}
                  className="mt-6 px-6 py-3 bg-[#6eb300] text-white rounded-full font-bold"
                >
                  Write First Blog
                </button>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
};

export default AllPosts;
