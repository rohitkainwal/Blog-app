import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { api } from "../axios/axiosInstance";
import toast from "react-hot-toast";

const SinglePost = () => {
  const { id } = useParams();
  const { posts, fetchPosts } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add null check for posts
  const post = (posts || []).find((p) => p._id === id);

  // Loading state
  if (!posts) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Navbar />
        <p className="text-center mt-20">Loading...</p>
      </div>
    );
  }

  // Post not found
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        <Navbar />
        <p className="text-center mt-20 text-red-600">Post not found</p>
      </div>
    );
  }

  const handleDelete = async ()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this post?")
    
    if(!confirmDelete)return;
    try {
      await api.delete(`/post/delete/${id}`)
      
      toast.success("post deleted")
      navigate("/")
      
    } catch (error) {
      toast.error("post deleted failed")
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-200">
          {post.image && (
            <div className="w-full h-[420px] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4 justify-between">
              <div className="flex gap-3">
                <span className="px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-md">
                  Article
                </span>
                {post.createdAt && (
                  <span className="text-sm text-gray-500 flex items-center">
                    {new Date(post.createdAt).toDateString()}
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  title="Edit Post"
                >
                  <FaEdit size={18} />
                </button>

                <button 
                  onClick={()=> handleDelete(post._id)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  title="Delete Post"
                >
                  <FaTrash size={17} />
                </button>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-6">
              {post.title}
            </h1>

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

            <div className="h-[1px] bg-gradient-to-r from-transparent via-green-300 to-transparent mb-8"></div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;