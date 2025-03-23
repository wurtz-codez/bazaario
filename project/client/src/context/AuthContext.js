import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        // Invalid JSON in localStorage
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const response = await api.post('/api/users/login', { email, password });
      const userData = response.data;
      
      if (userData && userData.token) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.',
      };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      console.log('Attempting registration with:', { name, email });
      const response = await api.post('/api/users/register', {
        name,
        email,
        password,
      });
      const userData = response.data;
      
      if (userData && userData.token) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;