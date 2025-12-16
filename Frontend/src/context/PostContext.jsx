import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createContext } from "react";
import { api } from "../axios/axiosInstance";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await api.get("post/get-posts");
      setPosts(res.data.data);
    } catch (error) {
      toast.error("data not fetched", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <PostContext.Provider value={{ posts, setPosts, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};
