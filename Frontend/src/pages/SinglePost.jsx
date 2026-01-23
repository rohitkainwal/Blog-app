import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { api } from "../axios/axiosInstance";
import toast from "react-hot-toast";

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, fetchPosts } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const post = (posts || []).find((p) => p._id === id);

  /* -------------------- STATES -------------------- */
  if (!posts) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <Navbar />
        <p className="text-center mt-24 text-zinc-500">Loading post…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <Navbar />
        <p className="text-center mt-24 text-red-500">Post not found</p>
      </div>
    );
  }

  /* -------------------- DELETE -------------------- */
  const handleDelete = async () => {
    if (!user) {
      toast.error("Please login to delete post");
      navigate("/login");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/post/delete/${id}`);
      toast.success("Post deleted successfully");
      navigate("/");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* ---------------- NAVBAR ---------------- */}
      <Navbar />

      {/* ---------------- BACK BUTTON ---------------- */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate("/")}
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-full
            border text-sm font-medium
            bg-white dark:bg-zinc-900
            border-zinc-200 dark:border-zinc-800
            hover:shadow-md transition
          "
          style={{ color: `rgb(var(--color-primary))` }}
        >
          <FaArrowLeft size={13} />
          All Posts
        </button>
      </div>

      {/* ---------------- HERO ---------------- */}
      <div className="relative w-full h-[60vh] max-h-[520px] mt-6">
        {post.image?.url && (
          <img
            src={post.image.url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 md:px-12 text-white">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: `rgb(var(--color-primary))` }}
          >
            ARTICLE
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mt-4 text-sm opacity-90">
            <span>{post.author?.username || "Unknown Author"}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* ACTION BAR */}
         <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="
              w-11 h-11 flex items-center justify-center
              rounded-xl text-white transition
            "
            style={{ backgroundColor: `rgb(var(--color-primary))` }}
            title="Edit Post"
          >
            <FaEdit size={16} />
          </button>

          <button
            onClick={handleDelete}
            className="
              w-11 h-11 flex items-center justify-center
              rounded-xl bg-red-500 hover:bg-red-600
              text-white transition
            "
            title="Delete Post"
          >
            <FaTrash size={15} />
          </button>
        </div>

        {/* AUTHOR */}
        <div className="flex items-center gap-4 mb-10 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: `rgb(var(--color-primary))` }}
          >
            {post.author?.username?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              {post.author?.username || "Unknown Author"}
            </p>
            <p className="text-xs text-zinc-500">Author</p>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          className="h-[2px] w-full mb-10 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, rgb(var(--color-primary)), transparent)`
          }}
        />

        {/* ARTICLE CONTENT */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-300">
            {post.content}
          </p>
        </article>
      </div>
    </div>
  );
};

export default SinglePost;
