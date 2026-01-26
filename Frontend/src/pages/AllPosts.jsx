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
  FaFire,
  FaBookmark,
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
  const [activeView, setActiveView] = useState("posts");
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const userMenuRef = useRef(null);

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

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'rgb(var(--color-primary))', borderTopColor: 'transparent' }}></div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Loading your workspace...</p>
        </div>
      </div>
    );

  const avatarInitial = user?.fullName?.charAt(0) || user?.username?.charAt(0) || "?";

  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* Subtle ambient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10 dark:opacity-5 animate-pulse"
          style={{ backgroundColor: 'rgb(var(--color-primary))' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10 dark:opacity-5 animate-pulse"
          style={{ backgroundColor: 'rgb(var(--color-primary))', animationDelay: '2s' }}></div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-100 dark:border-zinc-900 transform transition-all duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 shadow-2xl lg:shadow-none`}
      >
        <div className="p-8 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between mb-12">
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
              className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors text-zinc-400"
              onClick={() => setIsDrawerOpen(false)}
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* New Blog Button */}
          <button
            onClick={() => {
              setActiveView("create");
              setIsDrawerOpen(false);
            }}
            className="relative group mb-8 w-full px-4 py-3 rounded-xl text-white font-medium text-sm shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            style={{ backgroundColor: 'rgb(var(--color-primary))' }}
          >
            <span className="relative flex items-center justify-center gap-2">
              <FaPlus size={12} /> New Blog
            </span>
          </button>

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            <button
              onClick={() => {
                setActiveView("posts");
                setIsDrawerOpen(false);
              }}
              className={`group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeView === "posts"
                  ? "text-white"
                  : "text-zinc-500 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
              style={activeView === "posts" ? { backgroundColor: 'rgb(var(--color-primary))' } : {}}
            >
              <FaThLarge size={14} />
              <span>All Blogs</span>
            </button>

            <button className="group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-zinc-500 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-300 font-medium text-sm transition-all duration-200">
              <FaFire size={14} />
              <span>Trending</span>
            </button>

            <button className="group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-zinc-500 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-300 font-medium text-sm transition-all duration-200">
              <FaBookmark size={14} />
              <span>Saved</span>
            </button>

            <button className="group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-zinc-500 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-300 font-medium text-sm transition-all duration-200">
              <FaPenNib size={14} />
              <span>My Drafts</span>
            </button>
          </nav>

          {/* Stats Card */}
          <div className="mt-auto p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-600 mb-3">
              Your Stats
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-500 font-light">Total Blogs</span>
                <span className="text-lg font-bold" style={{ color: 'rgb(var(--color-primary))' }}>
                  {posts?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500 dark:text-zinc-500 font-light">This Week</span>
                <span className="text-lg font-bold text-zinc-700 dark:text-zinc-400">3</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* -------- TOP BAR -------- */}
        <header className="sticky top-0 z-40 h-16 px-6 flex items-center justify-between bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
          {/* LEFT: Menu & Search */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-all text-zinc-400"
              onClick={() => setIsDrawerOpen(true)}
            >
              <FaBars size={18} />
            </button>

            <div className="relative hidden md:flex items-center group">
              <FaSearch 
                className="absolute left-3.5 text-zinc-400 transition-colors z-10"
                size={14}
              />
              <input
                placeholder="Search blogs..."
                className="pl-10 pr-4 py-2 w-72 rounded-lg bg-zinc-50 dark:bg-zinc-900 dark:text-white outline-none border border-transparent focus:border-opacity-100 transition-all duration-300 font-light text-sm placeholder:text-zinc-400"
                style={{
                  borderColor: 'transparent',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(var(--color-primary))';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              />
            </div>
          </div>

          {/* RIGHT: Tools & User */}
          <div className="flex items-center gap-3">
            {/* Color Picker */}
            <div className="relative">
              <button
                onClick={() => setIsPickerOpen(!isPickerOpen)}
                className="p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
                style={{ color: 'rgb(var(--color-primary))' }}
                title="Change Theme Color"
              >
                <MdOutlineColorLens size={18} />
              </button>

              {isPickerOpen && (
                <div className="absolute right-0 mt-3 z-50">
                  <ThemeColorPicker close={() => setIsPickerOpen(false)} />
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="relative w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
              style={{
                backgroundColor: isDark ? 'rgba(var(--color-primary), 0.1)' : 'rgb(254, 243, 199)',
              }}
            >
              <div
                className={`absolute w-5 h-5 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-sm ${
                  isDark ? "translate-x-7" : "translate-x-0"
                }`}
                style={{
                  backgroundColor: isDark ? 'rgb(var(--color-primary))' : 'rgb(234, 179, 8)',
                }}
              >
                {isDark ? <FaMoon size={10} /> : <FaSun size={10} />}
              </div>
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-9 h-9 rounded-full text-white font-medium uppercase transition-all shadow-sm hover:shadow-md flex items-center justify-center border border-white/20 dark:border-zinc-800 hover:scale-105 duration-300 text-sm"
                style={{ backgroundColor: 'rgb(var(--color-primary))' }}
              >
                {avatarInitial}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-4 border-b border-zinc-100 dark:border-zinc-900">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-10 rounded-full text-white font-medium flex items-center justify-center text-sm shadow-sm"
                        style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
                        {avatarInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm dark:text-white truncate">
                          {user?.username}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 truncate font-light">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-all duration-200 font-light">
                      <FaUserEdit className="text-zinc-400" size={14} /> 
                      <span>Edit Profile</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-all duration-200 font-light">
                      <FaLock className="text-zinc-400" size={14} /> 
                      <span>Security</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-zinc-100 dark:border-zinc-900">
                    <Link to="/" onClick={logout}>
                      <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 font-light">
                        <FaSignOutAlt size={14} /> Sign Out
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* -------- CONTENT -------- */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {activeView === "create" && <CreatePost />}

          {activeView === "posts" &&
            (posts?.length ? (
              <div>
                {/* Welcome Message */}
                <div className="mb-12">
                  <h2 className="text-2xl font-light text-zinc-900 dark:text-white mb-1">
                    {getGreeting()}, {user?.username || 'Ajay'} 👋
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-500 font-light">
                    Ready to write something today?
                  </p>
                </div>

                {/* Section Header */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-1">
                    All Blogs
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 font-light">
                    {posts.length} {posts.length === 1 ? 'blog' : 'blogs'} published
                  </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <PostCard />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                    <FaPenNib size={24} className="text-zinc-300 dark:text-zinc-700" />
                  </div>
                  <h2 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">
                    No blogs yet
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-500 mb-8 font-light">
                    Start your writing journey by creating your first blog post
                  </p>
                  <button
                    onClick={() => setActiveView("create")}
                    className="px-6 py-3 rounded-lg text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-300"
                    style={{ backgroundColor: 'rgb(var(--color-primary))' }}
                  >
                    Write First Blog
                  </button>
                </div>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
};

export default AllPosts;