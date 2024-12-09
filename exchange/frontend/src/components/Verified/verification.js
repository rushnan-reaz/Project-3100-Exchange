import React, { useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';


const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();
  const token = new URLSearchParams(window.location.search).get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError('No verification token found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/verify-email?token=${token}`);
        const data = await response.json();

        setIsLoading(false);
        if (data.success) {
          history.push('/verified');
        } else {
          setError(data.message);
          history.push('/verification-failed');
        }
      } catch (err) {
        setIsLoading(false);
        setError('Verification failed');
        history.push('/verification-failed');
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