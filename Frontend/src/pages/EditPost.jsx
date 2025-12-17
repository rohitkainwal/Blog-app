import React, { useContext, useState } from "react";
import Navbar from "./../components/Navbar";
import { FaPersonBooth } from "react-icons/fa";
import { api } from "../axios/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";

const EditPost = () => {
const {fetchPosts} = useContext(PostContext)
const navigate = useNavigate();
const [formData , setFormData] = useState({
    title:"",    
    content:"",
});

const handleChange = (e)=>{
    let {name, value}= e.target;
    setFormData({...formData, [name]:value});
}
const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        const res = await api.post("/post/create-post",formData) 
      console.log(res.data)
     await fetchPosts();
     toast.success("post created successfully")
     console.log("posted success")
     navigate("/")

    } catch (error) {
         toast.error(`❌ ${error.response?.data?.message}`);
         console.log("post not created")
    }
}

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
    <Navbar />

    {/* Page Title */}
    <h1 className="text-center text-3xl md:text-4xl mt-10 font-extrabold text-green-700">
      Create New Post
    </h1>
    <p className="text-center text-gray-600 mt-2">
      Share your thoughts with the community
    </p>

    {/* Form Card */}
    <div className="max-w-3xl mx-auto px-6 py-10 mt-10 bg-white border border-green-200 rounded-3xl shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Title */}
        <div>
          <label className="text-gray-700 font-semibold text-sm flex items-center gap-2 mb-2">
            <FaPersonBooth className="text-green-600" />
            Post Title
          </label>
          <input
            className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formData.title}
            placeholder="Enter post title"
          />
        </div>

        {/* Content */}
        <div>
          <label className="text-gray-700 font-semibold text-sm flex items-center gap-2 mb-2">
            <FaPersonBooth className="text-green-600" />
            Post Content
          </label>
          <textarea
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 resize-none"
            type="text"
            name="content"
            id="content"
            onChange={handleChange}
            value={formData.content}
            rows={6}
            placeholder="Write your post content here..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-14 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Publish Post
          </button>
        </div>

      </form>
    </div>
  </div>
);

};

export default EditPost;
