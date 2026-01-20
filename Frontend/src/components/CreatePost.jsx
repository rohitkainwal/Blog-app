import React, { useContext, useState } from "react";
import { FaFeather, FaImage, FaHeading, FaTimes } from "react-icons/fa";
import { api } from "../axios/axiosInstance";
import toast from "react-hot-toast";
import { PostContext } from "../context/PostContext";

const CreatePost = ({ onPostCreated }) => {
  const { fetchPosts } = useContext(PostContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      return toast.error("Please fill in all required fields");
    }

    setLoading(true);
    try {
      const res = await api.post("/post/create-post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchPosts();
      toast.success("Story published successfully!");

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <FaHeading className="text-green-600" /> Title
          </label>
          <input
            className="w-full text-2xl md:text-4xl font-bold bg-transparent border-none outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 dark:text-white"
            type="text"
            name="title"
            onChange={handleChange}
            value={formData.title}
            placeholder="Enter a catchy title..."
            autoFocus
          />
        </div>

        <hr className="border-zinc-100 dark:border-zinc-800" />

        <div className="space-y-2">
          <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <FaFeather className="text-green-600" /> Content
          </label>
          <textarea
            className="w-full min-h-[300px] text-lg bg-transparent border-none outline-none resize-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 dark:text-zinc-200"
            name="content"
            onChange={handleChange}
            value={formData.content}
            placeholder="Tell your story..."
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <FaImage className="text-green-600" /> Cover Image
          </label>

          <div className="flex items-center gap-4">
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                <FaImage className="text-zinc-300 mb-2" size={24} />
                <span className="text-sm text-zinc-400">
                  Click to upload image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative w-full h-64 rounded-2xl overflow-hidden group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData({ ...formData, image: null });
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTimes size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-10 border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="submit"
            disabled={loading}
            className={`px-10 py-3 bg-[#6eb300] hover:bg-[#5da000] text-white font-bold rounded-full shadow-lg shadow-green-900/20 transition-all active:scale-95 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Publishing..." : "Publish Story"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
