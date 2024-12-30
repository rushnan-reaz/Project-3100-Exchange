import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/authcontext.js";
import axios from "axios";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user has a valid session on initial load
    const checkAuthStatus = async () => {
      try {
        // API call to check the session status 
        const response = await axios.get("/api/session", {
          withCredentials: true, // Ensure cookies 
        });
        console.log('Session check response:', response); 
        if (response.status === 200) {
          setIsAuthenticated(true); // If session is valid, user is authenticated
        } else {
          setIsAuthenticated(false); // If no valid session, user is not authenticated
        }
      } catch (error) {
        console.log("Session verification failed:", error);
        setIsAuthenticated(false); // If error, user is not authenticated
      } finally {
        setLoading(false); // Set loading to false after verification
      }
    };

    checkAuthStatus(); // Check authentication status when the component mounts
  }, [setIsAuthenticated]);

  // Show loading state while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} /> // render the protected component
        ) : (
          <Redirect to="/login" /> //redirect to login page
        )
      }
    />
  );
};

export default ProtectedRoute;