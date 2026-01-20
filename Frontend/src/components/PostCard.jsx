import React, { useContext } from 'react';
import { PostContext } from "../context/PostContext";
import { Link } from 'react-router-dom';
import { FaRegClock, FaArrowRight, FaFeatherPointed } from 'react-icons/fa6'; // Updated icons

const PostCard = () => {
  const { posts } = useContext(PostContext);

  const timeAgo = (createdAt) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-32 px-6 text-center">
        <div className="w-20 h-20 mb-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-3xl">
          <FaFeatherPointed className="text-zinc-400" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">The ink has yet to dry</h3>
        <p className="text-zinc-500 max-w-xs mx-auto">We're waiting for the first story to be told. Why not start yours today?</p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => {
        const { _id, title, content, createdAt, image, author } = post;
        const { username, avatar } = author || {};

        return (
          <article 
            key={_id}
            className="group relative flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[2.5rem] p-4 transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
          >
            {/* Image Section */}
            <div className="relative h-72 w-full overflow-hidden rounded-[2rem] bg-zinc-100 dark:bg-zinc-800">
              <Link to={`/SinglePost/${_id}`}>
                {image?.url ? (
                  <img 
                    src={image.url} 
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-40">
                    <FaFeatherPointed size={40} />
                  </div>
                )}
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/70 dark:bg-black/40 px-4 py-1.5 rounded-full border border-white/20">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
                    Featured
                   </span>
                </div>
              </Link>
            </div>

            {/* Content Section */}
            <div className="px-4 pt-6 pb-4 flex flex-col flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                  <FaRegClock className="text-primary text-sm" />
                  {timeAgo(createdAt)}
                </div>
                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">5 min read</span>
              </div>

              <Link to={`/SinglePost/${_id}`}>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 leading-[1.2] hover:text-primary transition-colors line-clamp-2">
                  {title}
                </h2>
              </Link>

              <p className="text-zinc-500 dark:text-zinc-400 text-[0.95rem] leading-relaxed line-clamp-3 mb-8">
                {content}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <img 
                      src={avatar || `https://ui-avatars.com/api/?name=${username}&background=random`} 
                      alt={username} 
                      className="w-full h-full rounded-full object-cover ring-2 ring-zinc-50 dark:ring-zinc-800" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-400">Written by</span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{username || 'Anonymous'}</span>
                  </div>
                </div>

                <Link 
                  to={`/SinglePost/${_id}`}
                  className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default PostCard;