// AuthContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";  // <-- import
import axios from "axios";

const setAuthTokenHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();  // <-- get navigate

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`);
      setUser(response.data.user);  // make sure you access user object
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setAuthTokenHeader(null);
      localStorage.removeItem("token");
      setError(err.response?.data?.message || "Failed to fetch user");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (token) => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthTokenHeader(token);
      const success = await fetchUser();
      if (success) {
        navigate("/dashboard");  // <-- redirect on successful login
      }
      return success;
    }
    setError("No token provided");
    return false;
  }, [fetchUser, navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthTokenHeader(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    navigate("/login");  // optional: redirect to login on logout
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthTokenHeader(token);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const updateUser = async (data) => {
    try {
      const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/auth/update`,data);
      if (response.data.success) {
        setUser(response.data.user);
        return true;
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        error,
        fetchUser,
        updateUser,  // <-- add updateUser to context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
