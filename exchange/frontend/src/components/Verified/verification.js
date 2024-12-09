import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const VerifyEmail = () => {
  const history = useHistory();
  const token = new URLSearchParams(window.location.search).get('token');
  console.log('Token received:', token);

  
  useEffect(() => {
    if (token) {
      // Call your backend API to verify the token
      fetch(`/api/verify-email?token=${token}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            history.push('/verified');  // Redirect to the verified page
          } else {
            console.error(data.message);  // Log the error message for debugging
            history.push('/verification-failed');  // Redirect to the failure page
          }
        })
        .catch(() => {
          console.error('Error occurred during verification.');
          history.push('/verification-failed');  // Redirect to the failure page if there's an error
        });
    } else {
      console.error('No token found.');
      history.push('/verification-failed');  // Redirect to the failure page if no token
    }
  }, [token, history]);

  return null;  // This component just handles the redirect logic, no need to render anything
};

export default VerifyEmail;
