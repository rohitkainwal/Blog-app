import React, { useContext, useState } from 'react'
import { FaPersonBooth } from "react-icons/fa";
import Navbar from '../components/Navbar';
import { PostContext } from '../context/PostContext';

const EditPost = () => {

  const {posts, setPosts} = useContext(PostContext);
 
const [FormData, setFormData] = useState({
      title:posts.title,
      content:posts.content
    });

  handleChange=(e)=>{
    setFormData({...FormData , [e.target.name]:e.target.value})
  }
  handleSubmit = (e)=>{
    e.target.value();
  }

  return (

    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-50'>
      <Navbar/>
      {/* Page Title */}
  <h1 className="text-center text-3xl md:text-4xl mt-10 font-extrabold text-green-700">
  Edit Your Article
</h1>
<p className="text-center text-gray-600 mt-2">
  Make changes and keep your content fresh
</p>

    
    
    <div className='max-w-3xl mx-auto px-6 py-10 mt-10 bg-white border border-green-200 rounded-3xl shadow-2xl'>
      <form onSubmit={handleSubmit}>
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
                    value={FormData.title}
                    onChange={handleChange}
                    id="title"
                   
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
                    onChange={handleChange}
                    id="content"
                 
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
  )
}

export default EditPost