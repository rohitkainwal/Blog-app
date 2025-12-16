import React from 'react';
import { useContext } from 'react';
import { PostContext } from "../context/PostContext";
import { Link } from 'react-router-dom';




const PostCard = () => {
  const { posts } = useContext(PostContext);

  const timeAgo = (createdAt) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return '1 week ago';
    return `${diffInWeeks} weeks ago`;
  };

  return (
    <div className="grid gap-6 p-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      {posts.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center">
          No posts found
        </p>
      ) : (
       posts.map((post) => {
  const { _id, title, content, createdAt, image, author } = post;
  const { username } = author || {};

          return (
            <div key={_id}
              className="w-full flex bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-green-200 hover:border-green-400 overflow-hidden group transform hover:-translate-y-1"
            >
              {/* Image */}
              <div className="h-56 w-56 flex-shrink-0 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
                {image ? (
                  <img 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-green-600 text-5xl">📝</span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold shadow-md">
                      Article
                    </span>
                    {createdAt && (
                      <span className="text-gray-500 text-xs">{timeAgo(createdAt)}</span>
                    )}
                  </div>

                  <h2 className="text-left text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors duration-300 mb-2">
                    {title}
                  </h2>

                  <p className="text-sm text-gray-600 line-clamp-3 text-left leading-relaxed mb-3">
                    {content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-green-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {username ? username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">By {username || 'Unknown'}</p>
                    </div>
                  </div>

                  <Link to ={`/SinglePost/${_id}`}
                 
                  
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Read More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PostCard;