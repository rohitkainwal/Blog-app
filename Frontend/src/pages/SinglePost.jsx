import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";

const SinglePost = () => {
  const { id } = useParams(); // URL se id
  const { posts } = useContext(PostContext);

  const post = posts.find((p) => p._id === id);

  if (!post) return <p>Post not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Post Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-200">
          {/* Image */}
          {post.image && (
            <div className="w-full h-[420px] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta Info */}
            <div className="flex items-center gap-3 mb-4 justify-between">
              <div className="flex gap-3 ">
                <span className="px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-md">
                  Article
                </span>
                {post.createdAt && (
                  <span className="text-sm text-gray-500 align flex items-center">
                    {new Date(post.createdAt).toDateString()}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                {/* Edit */}
                <Link to="/edit-post">
                <button
                  onClick={() => navigate(`/edit-post/${post._id}`)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl
      bg-gradient-to-r from-green-600 to-emerald-600
      hover:from-green-700 hover:to-emerald-700
      text-white shadow-md hover:shadow-lg
      transition-all duration-300"
                  title="Edit Post"
                >
                  <FaEdit size={18} />
                </button>
                </Link>

                {/* Delete */}
                <button
                  // onClick={handleDelete}
                  className="w-11 h-11 flex items-center justify-center rounded-xl
      bg-gradient-to-r from-red-500 to-rose-600
      hover:from-red-600 hover:to-rose-700
      text-white shadow-md hover:shadow-lg
      transition-all duration-300"
                  title="Delete Post"
                >
                  <FaTrash size={17} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-6">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {post.author?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {post.author?.username || "Unknown Author"}
                </p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-green-300 to-transparent mb-8"></div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {post.content}
            </div>
            {/* Edit */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
