import axios from 'axios';

// Base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Create an axios instance with the base URL
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - Is the server running?', error);
    }
    return Promise.reject(error);
  }
);

// Create an axios instance with auth token
export const authAPI = (token) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  // Add the same response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === 'ERR_NETWORK') {
        console.error('Network error - Is the server running?', error);
      }
      return Promise.reject(error);
    }
  );
  
  return instance;
};