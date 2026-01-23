import React, { useContext, useState, useEffect } from "react";
import { FaRegEdit, FaImage, FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import toast from "react-hot-toast";
import { api } from "../axios/axiosInstance";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, setPosts, fetchPosts } = useContext(PostContext);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const post = (posts || []).find((p) => p._id === id);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        image: post.image,
      });
      setPreview(post.image?.url || null);
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);

      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }

      const res = await api.patch(`/post/edit/${id}`, data);
      const updatedPost = res.data.post || res.data.data || res.data;

      setPosts(posts.map((p) => (p._id === id ? updatedPost : p)));

      toast.success("Post updated successfully");
      navigate(`/SinglePost/${id}`);
    } catch (error) {
      toast.error("Failed to update post");
    }
  };

  /* ---------------- STATES ---------------- */
  if (!posts) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <Navbar />
        <p className="text-center mt-24 text-zinc-500">Loading…</p>
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

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* BACK BUTTON */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={() => navigate(`/SinglePost/${id}`)}
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
          Back to Post
        </button>
      </div>

      {/* HEADER */}
      <div className="text-center mt-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Edit Article
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Update your content and keep it fresh
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="
            bg-white dark:bg-zinc-900
            border border-zinc-200 dark:border-zinc-800
            rounded-3xl p-8 md:p-10
            shadow-xl
          "
        >
          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="mb-8 overflow-hidden rounded-2xl">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* TITLE */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
              <FaRegEdit style={{ color: `rgb(var(--color-primary))` }} />
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="
                w-full px-5 py-3 rounded-xl
                border border-zinc-300 dark:border-zinc-700
                bg-zinc-50 dark:bg-zinc-800
                text-zinc-900 dark:text-zinc-100
                focus:outline-none focus:ring-2
              "
              style={{ outlineColor: `rgb(var(--color-primary))` }}
            />
          </div>

          {/* CONTENT */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
              <FaRegEdit style={{ color: `rgb(var(--color-primary))` }} />
              Post Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={7}
              required
              className="
                w-full px-5 py-4 rounded-xl resize-none
                border border-zinc-300 dark:border-zinc-700
                bg-zinc-50 dark:bg-zinc-800
                text-zinc-900 dark:text-zinc-100
                focus:outline-none focus:ring-2
              "
              style={{ outlineColor: `rgb(var(--color-primary))` }}
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mb-10">
            <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-zinc-700 dark:text-zinc-300">
              <FaImage style={{ color: `rgb(var(--color-primary))` }} />
              Update Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="
                w-full px-4 py-3 rounded-xl
                border border-zinc-300 dark:border-zinc-700
                bg-zinc-50 dark:bg-zinc-800
                text-zinc-600 dark:text-zinc-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                transition
              "
            />
          </div>

          {/* ACTION */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="
                px-12 py-3 rounded-full
                text-white font-semibold text-lg
                transition hover:scale-105
              "
              style={{ backgroundColor: `rgb(var(--color-primary))` }}
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
