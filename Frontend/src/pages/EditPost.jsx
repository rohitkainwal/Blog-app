import React, { useContext, useState, useEffect } from 'react'
import { FaPersonBooth } from "react-icons/fa";
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import toast from 'react-hot-toast';
import { api } from '../axios/axiosInstance';

const EditPost = () => {
  const { id } = useParams();
  const { posts, setPosts, fetchPosts } = useContext(PostContext);
  const navigate = useNavigate();

  const [FormData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Fetch posts on mount - MOVE TO TOP
  useEffect(() => {
    fetchPosts();
  }, []);

  // Find the post
  const post = (posts || []).find((p) => p._id === id);

  // Update form data when post is loaded
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
      });
    }
  }, [post]);

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // FIX: Send FormData in the request
      const res = await api.patch(`/post/edit/${id}`, FormData);
      console.log("EDIT RESPONSE 👉", res.data);
      
      // Handle different response structures
      const updatedPost = res.data.post || res.data.data || res.data;
      
      setPosts(
        posts.map((p) =>
          p._id === id ? updatedPost : p
        )
      );
    
      toast.success("Post updated successfully!");
      navigate(`/SinglePost/${id}`);

    } catch (error) {
      console.error(error);
      toast.error("Post update failed");
    }
  }

  // Loading state
  if (!posts) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-50'>
        <Navbar />
        <p className="text-center mt-20 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Post not found
  if (!post) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-50'>
        <Navbar />
        <p className="text-center mt-20 text-red-600 text-xl">Post not found</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-50'>
      <Navbar />
      
      <h1 className="text-center text-3xl md:text-4xl mt-10 font-extrabold text-green-700">
        Edit Your Article
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Make changes and keep your content fresh
      </p>

      <div className='max-w-3xl mx-auto px-6 py-10 mt-10 bg-white border border-green-200 rounded-3xl shadow-2xl'>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 font-semibold text-sm flex items-center gap-2 mb-2">
              <FaPersonBooth className="text-green-600" />
              Post Title
            </label>
            <input
              className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              type="text"
              name="title"
              value={FormData.title}
              onChange={handleChange}
              id="title"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="mt-6">
            <label className="text-gray-700 font-semibold text-sm flex items-center gap-2 mb-2">
              <FaPersonBooth className="text-green-600" />
              Post Content
            </label>
            <textarea
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 resize-none"
              name="content"
              value={FormData.content}
              onChange={handleChange}
              id="content"
              rows={6}
              placeholder="Write your post content here..."
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-14 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost
