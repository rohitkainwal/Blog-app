import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

const colors = [
  { name: "Blue", value: "59 130 246" },
  { name: "Indigo", value: "99 102 241" },
  { name: "Purple", value: "168 85 247" },
  { name: "Pink", value: "236 72 153" },
  { name: "Rose", value: "244 63 94" },
  { name: "Green", value: "34 197 94" },
  { name: "Emerald", value: "16 185 129" },
  { name: "Teal", value: "20 184 166" },
  { name: "Cyan", value: "6 182 212" },
  { name: "Sky", value: "14 165 233" },
  { name: "Orange", value: "249 115 22" },
  { name: "Amber", value: "245 158 11" },
  { name: "Yellow", value: "234 179 8" },
  { name: "Lime", value: "132 204 22" },
  { name: "Red", value: "239 68 68" },
  { name: "Slate", value: "71 85 105" },
];

const ThemeColorPicker = ({ close }) => {
  const pickerRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(
    document.documentElement.style.getPropertyValue("--color-primary") || "168 85 247"
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const setColor = (rgb) => {
    document.documentElement.style.setProperty("--color-primary", rgb);
    setSelectedColor(rgb);
  };

  return (
    <div 
      ref={pickerRef}
      className="absolute z-50 right-0 top-14 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-5 w-64 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="mb-4">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Theme Color</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Choose your accent color</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => setColor(c.value)}
            className={`w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg relative group ${
              selectedColor === c.value ? "ring-2 ring-offset-2 ring-zinc-900 dark:ring-white ring-offset-white dark:ring-offset-zinc-900 scale-105" : ""
            }`}
            style={{ backgroundColor: `rgb(${c.value})` }}
            title={c.name}
          >
            {selectedColor === c.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-5 h-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {c.name}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={close}
        className="w-full mt-2 py-2 px-4 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 hover:text-zinc-900 dark:hover:text-white"
      >
        Close
      </button>
    </div>
  );
};

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
            ? "mt-2 mx-2 md:mx-auto rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-zinc-950/80 shadow-2xl shadow-violet-500/10 max-w-5xl border border-white/20 dark:border-zinc-800/50"
            : "mt-1 mx-2 md:mx-auto rounded-2xl backdrop-blur-md bg-white/70 dark:bg-zinc-950/90 max-w-6xl border border-white/20 dark:border-zinc-800/50"
        }
      `}
    >
      <div className="h-16 md:h-20 lg:h-24 px-3 md:px-6 lg:px-10 flex items-center justify-between transition-all duration-500">
        <Link to="/">
          <div className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-[2px] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <div className="w-full h-full rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center font-extrabold text-lg">
                <span className="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  W
                </span>
              </div>
            </div>
            <div className="leading-tight">
              <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                WriteHub
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block">Where ideas come alive</p>
            </div>
          </div>
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* 🎨 Smart Theme Icon */}
          <div className="relative">
            <button
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-violet-500 dark:text-violet-400 transition-all duration-300 hover:scale-110 hover:rotate-12"
            >
              <MdOutlineColorLens size={20} />
            </button>
            {isPickerOpen && <ThemeColorPicker close={() => setIsPickerOpen(false)} />}
          </div>

          {/* 🌗 Theme Toggle Switch */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-16 h-8 flex items-center rounded-full bg-zinc-200 dark:bg-zinc-800 p-1 transition-all duration-300 relative border border-zinc-300 dark:border-zinc-700 hover:shadow-lg"
          >
            <div
              className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg ${
                isDark ? "translate-x-8 bg-violet-600" : "translate-x-0 bg-yellow-500"
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

export default ThemeColorPicker;