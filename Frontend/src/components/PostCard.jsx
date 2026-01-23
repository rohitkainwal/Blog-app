import React, { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { Link } from "react-router-dom";
import { FaRegClock, FaArrowRight, FaFeatherPointed } from "react-icons/fa6";

const PostCard = () => {
  const { posts } = useContext(PostContext);

  const timeAgo = (createdAt) => {
    const now = new Date();
    const posted = new Date(createdAt);
    const diff = Math.floor((now - posted) / (1000 * 60 * 60));

    if (diff < 24) return `${diff}h ago`;
    if (diff < 168) return `${Math.floor(diff / 24)}d ago`;
    return `${Math.floor(diff / 168)}w ago`;
  };

  if (!posts?.length) {
    return (
      <div className="col-span-full flex flex-col items-center py-32 text-center">
        <FaFeatherPointed
          className="text-6xl mb-4"
          style={{ color: `rgb(var(--color-primary))` }}
        />
        <h3 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          No posts yet
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400">
          Start writing your first story
        </p>
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
            className="
              group flex flex-col overflow-hidden
              rounded-3xl border
              bg-white dark:bg-zinc-900
              border-zinc-200 dark:border-zinc-800
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
            "
          >
            {/* Image */}
            <Link to={`/SinglePost/${_id}`} className="relative h-64 overflow-hidden">
              {image?.url ? (
                <img
                  src={image.url}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                  <FaFeatherPointed
                    className="text-4xl"
                    style={{ color: `rgb(var(--color-primary))` }}
                  />
                </div>
              )}

              <div className="absolute inset-0 bg-black/10 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition" />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                <span className="flex items-center gap-1">
                  <FaRegClock style={{ color: `rgb(var(--color-primary))` }} />
                  {timeAgo(createdAt)}
                </span>
                <span>•</span>
                <span>5 min read</span>
              </div>

              {/* Title */}
              <Link to={`/SinglePost/${_id}`}>
                <h2
                  className="text-xl font-semibold mb-3 line-clamp-2 transition"
                  style={{
                    color: "inherit",
                  }}
                >
                  <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgb(var(--color-primary)), rgb(var(--color-primary)))`,
                    }}
                  >
                    {title}
                  </span>
                </h2>
              </Link>

              {/* Preview */}
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-6">
                {content}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      avatar ||
                      `https://ui-avatars.com/api/?name=${username}&background=random`
                    }
                    alt={username}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {username || "Anonymous"}
                  </span>
                </div>

                {/* Read More */}
                <Link
                  to={`/SinglePost/${_id}`}
                  className="
                    w-10 h-10 rounded-full
                    flex items-center justify-center
                    text-white transition
                  "
                  style={{
                    backgroundColor: `rgb(var(--color-primary))`,
                  }}
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
