import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; 

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory(); 
  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError("No verification token found");
        setIsLoading(false);
        return;
      }

      try {
        console.log("Verifying email with token:", token);
        const response = await fetch(`/api/verify-email?token=${token}`);
        const data = await response.json();

        console.log("API Response:", data);

        if (response.ok && data.success) {
          setIsLoading(false);
          history.push("/verified");
        } else {
          setError(data.message || "Verification failed");
          setIsLoading(false);
          history.push("/verification-failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Verification failed");
        setIsLoading(false);
        history.push("/verification-failed");
      }
    };

    verifyEmail();
  }, [token, history]);

  if (isLoading) {
    return <div>Verifying your email...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

export default VerifyEmail;
