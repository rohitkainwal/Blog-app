import React from "react";
import Navbar from "./../components/Navbar";
import { FaEdit, FaBookmark } from "react-icons/fa";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
          Share Your Knowledge
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover stories, thinking, and expertise from writers on any topic
        </p>

        <div className="flex gap-4 justify-center mt-6">
          <Link to="/CreatePost">
            <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
              <FaEdit size={18} />
              Write Article
            </button>
          </Link>
          <button className="px-8 py-3 bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 text-green-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-200 flex items-center gap-2">
            <FaBookmark size={16} />
            My Bookmarks
          </button>
        </div>

        <PostCard />
      </div>
    </div>
  );
};

export default HomePage;
