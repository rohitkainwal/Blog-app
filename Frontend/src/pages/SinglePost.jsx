import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import Navbar from "../components/Navbar";

const SinglePost = () => {
  const { id } = useParams();   // URL se id
  const { posts } = useContext(PostContext);

  const post = posts.find(p => p._id === id);

  
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
              <span className="text-sm text-gray-500 align">
                {new Date(post.createdAt).toDateString()}
              </span>
            )}     
            </div>
           
<div>
<button
        onClick={() => navigate(`/edit-post/${post._id}`)}
        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all"
      >
        Edit
      </button>

      {/* Delete */}
      <button
        // onClick={handleDelete}
        className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition-all"
      >
        Delete
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