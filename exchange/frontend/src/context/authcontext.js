import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext();

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  // Add axios interceptor for handling 401 responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // Function to check if the user is authenticated
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/session', {
        withCredentials: true,
      });
      
      console.log('Session check response:', response.data);
      
      if (response.status === 200 && response.data.userId) {
        try {
          const userResponse = await axios.get(`/api/user`, {
            withCredentials: true
          });
          
          console.log('User response:', userResponse.data);
  
          if (userResponse.data && userResponse.data.user) {
            setIsAuthenticated(true);
            setUser(userResponse.data.user);
            console.log('User state updated:', userResponse.data.user);
          } else {
            throw new Error('No user data in response');
          }
        } catch (userError) {
          console.error('Error fetching user data:', userError);
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle login function
  const login = async (userData, token) => {
    try {
      // Set auth token if using JWT
      if (token) {
        localStorage.setItem('accessToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
  
      // Update auth state
      setIsAuthenticated(true);
      setUser(userData);
      
      console.log('Login successful:', {
        isAuthenticated: true,
        user: userData
      });
  
      // Trigger auth state check
      await checkAuthStatus();
  
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  // Handle logout function
  const logout = async () => {
    try {
      await axios.post('/api/logout');
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Check authentication status when the component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        user, 
        login, 
        logout,
        checkAuthStatus 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;