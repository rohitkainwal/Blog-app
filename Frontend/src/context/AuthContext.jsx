import { createContext, useEffect, useState } from "react";
import { api } from "../axios/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      console.log("🔄 Fetching current user...");
      const res = await api.get("/user/currentUser");
      console.log("✅ Full response:", res.data);
      
      // ApiResponse structure: { statusCode, message, data }
      if (res.data.data) {
        setUser(res.data.data);
        console.log("✅ User set:", res.data.data);
      } else {
        console.log("⚠️ No user data in response");
        setUser(null);
      }
    } catch (error) {
      console.log("❌ Fetch user error:", error.response?.data || error.message);
      console.log("❌ Status:", error.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};