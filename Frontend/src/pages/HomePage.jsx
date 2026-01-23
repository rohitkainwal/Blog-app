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
    <div className="relative bg-white dark:bg-black min-h-screen antialiased selection:bg-purple-500/20 dark:selection:bg-purple-500/20 transition-colors duration-500">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-20 dark:opacity-30"
          style={{ backgroundColor: 'rgb(var(--color-primary))' }}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-15 dark:opacity-20"
          style={{ 
            backgroundColor: 'rgb(var(--color-primary))',
            animationDelay: '1s'
          }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: 'rgb(var(--color-primary))' }}></div>
      </div>
      
      <BackgroundBlob/>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 px-6 overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Tagline with gradient border */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full backdrop-blur-sm border text-xs font-semibold tracking-wider uppercase mb-12 group transition-all duration-300 shadow-sm dark:shadow-none hover:shadow-md hover:scale-105"
            style={{
              backgroundColor: 'rgba(var(--color-primary), 0.1)',
              borderColor: 'rgba(var(--color-primary), 0.3)',
            }}>
            <span style={{ color: 'rgb(var(--color-primary))' }}>
              The Platform for Builders
            </span>
            <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" style={{ color: 'rgb(var(--color-primary))' }} />
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            <span className="text-gray-900 dark:text-white">
              Space for your
            </span>
            <br />
            <span className="relative inline-block mt-4">
              <span className="italic font-light" style={{ color: 'rgb(var(--color-primary))' }}>
                mind to breathe
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 blur-sm" 
                style={{ 
                  background: `linear-gradient(to right, rgba(var(--color-primary), 0.5), rgba(var(--color-primary), 0.3))` 
                }}></div>
            </span>
            <span className="text-gray-900 dark:text-white">.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            A minimalist sanctuary for your daily thoughts and deep dives. Capture
            what matters, leave the noise behind.
          </p>

          <Link to={destination}>
            <button className="group relative inline-flex items-center gap-3 px-10 py-4 text-base font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: 'rgb(var(--color-primary))',
                boxShadow: '0 0 40px rgba(var(--color-primary), 0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(var(--color-primary), 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(var(--color-primary), 0)';
              }}>
              <span className="relative">Start Writing</span>
              <FaArrowRight size={14} className="relative group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="relative p-12 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-md overflow-hidden group hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500 shadow-xl dark:shadow-none"
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(var(--color-primary), 0.2)',
          }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 opacity-10 dark:opacity-20"
            style={{ backgroundColor: 'rgb(var(--color-primary))' }}></div>
          
          <div className="relative text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Why this platform?
            </h2>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed max-w-2xl mx-auto text-lg">
              We believe writing should be simple, distraction-free, and meaningful.
              Whether it's a quick note or a long essay, our tools help you focus on
              clarity and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
              Recent Entries
            </h2>
            <p className="text-base text-gray-600 dark:text-white/50">
              Thoughtful perspectives from our community.
            </p>
          </div>
          <Link to={destination}
            className="group flex items-center gap-2.5 text-sm font-semibold uppercase text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-all duration-300">
            <span className="relative group-hover:opacity-100 transition-opacity">
              View Archive
              <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: 'rgb(var(--color-primary))' }}></span>
            </span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PostCard />
        </div>

        {/* Callout */}
        <div className="relative mt-32 p-12 md:p-20 rounded-3xl overflow-hidden group"
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'rgba(var(--color-primary), 0.2)',
          }}>
          <div className="absolute inset-0 backdrop-blur-md opacity-60"
            style={{ backgroundColor: 'rgba(var(--color-primary), 0.05)' }}></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
            style={{ backgroundColor: 'rgba(var(--color-primary), 0.1)' }}></div>
          
          <div className="relative text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Ready to share your story?
            </h3>
            <p className="text-base text-gray-700 dark:text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
              Join a community of writers who value quality over quantity.
            </p>
            <Link to={destination}>
              <button className="group/btn relative inline-flex items-center px-8 py-3.5 rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(var(--color-primary), 0.3)',
                  color: 'rgb(var(--color-primary))',
                }}>
                <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-all duration-300"
                  style={{ backgroundColor: 'rgba(var(--color-primary), 0.1)' }}></span>
                <span className="relative">Create Post</span>
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="px-6 py-24 border-t border-gray-200 dark:border-white/10">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500 dark:text-white/40 mb-8">
            Newsletter
          </h2>
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-full blur opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-60 transition-opacity duration-300"
              style={{ backgroundColor: 'rgb(var(--color-primary))' }}></div>
            <div className="relative flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 pl-6 pr-32 py-4 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none transition-all"
                style={{
                  borderColor: 'rgba(var(--color-primary), 0.2)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(var(--color-primary), 0.5)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(var(--color-primary), 0.2)';
                }}
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 text-white font-semibold text-xs uppercase rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgb(var(--color-primary))',
                  boxShadow: '0 0 0 rgba(var(--color-primary), 0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(var(--color-primary), 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 rgba(var(--color-primary), 0)';
                }}>
                Join
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;