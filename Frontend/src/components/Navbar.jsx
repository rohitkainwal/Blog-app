import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import { useState, useEffect } from "react";
import ThemeColorPicker from "./ThemeColorPicker";

const Navbar = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${
          scrolled
            ? "mt-2 mx-2 md:mx-auto rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-zinc-950/80 shadow-lg max-w-5xl"
            : "mt-1 mx-2 md:mx-auto rounded-2xl backdrop-blur-md bg-white/70 dark:bg-zinc-950/90 max-w-6xl"
        }
      `}
    >
      <div className="h-16 md:h-20 lg:h-24 px-3 md:px-6 lg:px-10 flex items-center justify-between transition-all duration-500">
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

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* 🎨 Smart Theme Icon */}
          <div className="relative">
            <button
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              className="p-2 border-1 rounded-full bg- hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[rgb(var(--color-primary))] dark:text-[rgb(var(--color-primary))]"
            >
              <MdOutlineColorLens size={20} />
            </button>
            {isPickerOpen && <ThemeColorPicker close={() => setIsPickerOpen(false)} />}
          </div>

          {/* 🌗 Theme Toggle Switch */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-16 h-8 flex items-center rounded-full bg-zinc-300 dark:bg-zinc-700 p-1 transition-colors duration-300 relative"
          >
            <div
              className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center text-white transition-transform duration-300 ${
                isDark ? "translate-x-8 bg-zinc-900" : "translate-x-0 bg-yellow-500"
              }`}
            >
              {isDark ? <FaMoon size={12} /> : <FaSun size={12} />}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
