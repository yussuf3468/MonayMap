import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    // check if token is present and has not expired
    const token = localStorage.getItem('authToken');
    if (token) {
     const decodedToken = jwtDecode(token);
      const isExpired = decodedToken.exp < Date.now() / 1000; 
      if (isExpired) {
        navigate('/login'); // Redirect to login if token is expired
      }
    }
  
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error('Failed to parse stored user:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
  
    setLoading(false); // Done loading
  }, []);
  

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;

    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    const { token, user } = response.data;

    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = async () => {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
      <AuthContext.Provider
        value={{
          user,
          login,
          register,
          logout,
          isAuthenticated: !!user,
          token: localStorage.getItem('authToken'), 
        }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
