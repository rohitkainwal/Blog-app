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
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-500">
      {/* Ambient background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 dark:opacity-10 animate-pulse"
          style={{ backgroundColor: 'rgb(var(--color-primary))' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 dark:opacity-10 animate-pulse"
          style={{ backgroundColor: 'rgb(var(--color-primary))', animationDelay: '2s' }}></div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-r border-zinc-200/50 dark:border-zinc-800/50 transform transition-all duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 shadow-2xl lg:shadow-none`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
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
              className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 dark:text-zinc-400"
              onClick={() => setIsDrawerOpen(false)}
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* New Blog Button */}
          <button
            onClick={() => {
              setActiveView("create");
              setIsDrawerOpen(false);
            }}
            className="relative group mb-6 w-full px-5 py-3.5 rounded-2xl text-white font-bold shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: 'rgb(var(--color-primary))' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
              style={{ backgroundColor: 'rgb(var(--color-primary))' }}></div>
            <span className="relative flex items-center justify-center gap-2">
              <FaPlus size={14} /> New Blog
            </span>
          </button>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <button
              onClick={() => {
                setActiveView("posts");
                setIsDrawerOpen(false);
              }}
              className={`group flex items-center gap-3 w-full px-5 py-3.5 rounded-xl font-semibold transition-all duration-200 ${
                activeView === "posts"
                  ? "text-white shadow-md"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
              style={activeView === "posts" ? { backgroundColor: 'rgb(var(--color-primary))' } : {}}
            >
              <FaThLarge size={16} />
              <span>All Blogs</span>
              {activeView === "posts" && (
                <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
              )}
            </button>

            <button className="group flex items-center gap-3 w-full px-5 py-3.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-all duration-200">
              <FaFire size={16} />
              <span>Trending</span>
            </button>

            <button className="group flex items-center gap-3 w-full px-5 py-3.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-all duration-200">
              <FaBookmark size={16} />
              <span>Saved</span>
            </button>

            <button className="group flex items-center gap-3 w-full px-5 py-3.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold transition-all duration-200">
              <FaPenNib size={16} />
              <span>My Drafts</span>
            </button>
          </nav>

          {/* Stats Card */}
          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Your Stats
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Total Blogs</span>
                <span className="text-lg font-black" style={{ color: 'rgb(var(--color-primary))' }}>
                  {posts?.length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">This Week</span>
                <span className="text-lg font-black text-zinc-700 dark:text-zinc-300">3</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* -------- TOP BAR -------- */}
        <header className="sticky top-0 z-40 h-20 px-6 flex items-center justify-between bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-300">
          {/* LEFT: Menu & Search */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all text-zinc-600 dark:text-zinc-400 hover:scale-105"
              onClick={() => setIsDrawerOpen(true)}
            >
              <FaBars size={20} />
            </button>

            <div className="relative hidden md:flex items-center group">
              <FaSearch 
                className="absolute left-4 text-zinc-400 transition-colors z-10"
                size={16}
                style={{ 
                  color: 'rgba(var(--color-primary), 0.5)'
                }}
              />
              <input
                placeholder="Search blogs..."
                className="pl-11 pr-4 py-3 w-80 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/80 dark:text-white outline-none border-2 border-transparent focus:border-opacity-100 transition-all duration-300 font-medium text-sm placeholder:text-zinc-400"
                style={{
                  borderColor: 'transparent',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(var(--color-primary))';
                  e.currentTarget.style.backgroundColor = 'rgba(var(--color-primary), 0.05)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.backgroundColor = '';
                }}
              />
            </div>
          </div>

          {/* RIGHT: Tools & User */}
          <div className="flex items-center gap-4">
            {/* Color Picker */}
            <div className="relative">
              <button
                onClick={() => setIsPickerOpen(!isPickerOpen)}
                className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 hover:scale-105"
                style={{ color: 'rgb(var(--color-primary))' }}
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

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="relative w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 shadow-inner hover:scale-105"
              style={{
                backgroundColor: isDark ? 'rgba(var(--color-primary), 0.2)' : 'rgb(250, 204, 21)',
              }}
            >
              <div
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg ${
                  isDark ? "translate-x-8" : "translate-x-0"
                }`}
                style={{
                  backgroundColor: isDark ? 'rgb(var(--color-primary))' : 'rgb(234, 179, 8)',
                }}
              >
                {isDark ? <FaMoon size={12} /> : <FaSun size={12} />}
              </div>
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-11 h-11 rounded-full text-white font-bold uppercase transition-all shadow-md hover:shadow-xl flex items-center justify-center border-2 border-white dark:border-zinc-700 hover:scale-110 duration-300"
                style={{ backgroundColor: 'rgb(var(--color-primary))' }}
              >
                {avatarInitial}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800"
                    style={{
                      background: `linear-gradient(135deg, rgba(var(--color-primary), 0.1), transparent)`,
                    }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full text-white font-bold flex items-center justify-center text-lg shadow-md"
                        style={{ backgroundColor: 'rgb(var(--color-primary))' }}>
                        {avatarInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm dark:text-white truncate">
                          {user?.username}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all duration-200">
                      <FaUserEdit className="text-zinc-400" size={16} /> 
                      <span className="font-medium">Edit Profile</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all duration-200">
                      <FaLock className="text-zinc-400" size={16} /> 
                      <span className="font-medium">Security</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                    <Link to="/" onClick={logout}>
                      <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 font-medium">
                        <FaSignOutAlt size={16} /> Sign Out
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
          {activeView === "create" && <CreatePost />}

          {activeView === "posts" &&
            (posts?.length ? (
              <div>
                {/* Page Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">
                    All Blogs
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400">
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
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                    <FaPenNib size={32} className="text-zinc-400" />
                  </div>
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">
                    No blogs yet
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                    Start your writing journey by creating your first blog post
                  </p>
                  <button
                    onClick={() => setActiveView("create")}
                    className="px-8 py-4 rounded-2xl text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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