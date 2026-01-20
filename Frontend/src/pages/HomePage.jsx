import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import BackgroundBlob from "../components/BackgroundBlob";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {

  const {user} = useContext(AuthContext)
  const destination = user ? "/all-posts" : "/login";
  return (
    <div className="bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 min-h-screen transition-colors duration-500 antialiased selection:bg-zinc-100 dark:selection:bg-zinc-800">
      <BackgroundBlob/>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-36 px-6 overflow-hidden">
        {/* Gradient glow background */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] opacity-[0.08] dark:opacity-[0.12] blur-[100px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgb(var(--color-primary)), transparent 70%)`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline pill */}
          <div  className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-[11px] font-medium tracking-[0.1em] uppercase text-zinc-500 dark:text-zinc-600 mb-10 bg-green-300 ">
            <span className="text-[rgb(var(--color-primary))]">The Platform for Builders</span>
            <FaArrowRight size={10} className="text-[rgb(var(--color-primary))] " />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
            Space for your{" "}
            <span className="text-zinc-400 dark:text-zinc-600 italic font-light">
              mind to breathe
            </span>
            .
          </h1>

          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            A minimalist sanctuary for your daily thoughts and deep dives. Capture
            what matters, leave the noise behind.
          </p>

          <Link to={destination}>
            <button
              className=" inline-flex items-center px-8 py-3 text-sm text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              style={{ backgroundColor: `rgb(var(--color-primary))` }}
            >
             <span>Start Writing  </span> <FaArrowRight size={10} className="text-white" />
            </button>
          </Link>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
          Why this platform?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          We believe writing should be simple, distraction-free, and meaningful.
          Whether it’s a quick note or a long essay, our tools help you focus on
          clarity and creativity.
        </p>
      </section>

      {/* --- CONTENT SECTION --- */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Recent Entries
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Thoughtful perspectives from our community.
            </p>
          </div>
          <Link to={destination}
            className="group flex items-center gap-2 text-xs font-semibold uppercase text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            View Archive
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <PostCard />
        </div>

        {/* Callout */}
        <div className="mt-32 p-10 md:p-16 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
            Ready to share your story?
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
            Join a community of writers who value quality over quantity.
          </p>
          <Link
            to={destination}
            className="inline-block px-6 py-2 border border-zinc-900 dark:border-white text-zinc-900 dark:text-white rounded-full text-sm font-medium hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all"
          >
            Create Post
          </Link>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="px-6 py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-sm mx-auto text-center">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-6">
            Newsletter
          </h2>
          <div className="relative group">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full pl-5 pr-28 py-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-sm focus:ring-2 ring-primary/30 outline-none transition-all"
            />
            <button className="absolute right-2 top-2 bottom-2 px-5 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white font-medium text-xs uppercase rounded-full hover:opacity-90 transition-opacity">
              Join
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
