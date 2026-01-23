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

          {/* 🌗 Theme Toggle Switch */}
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
