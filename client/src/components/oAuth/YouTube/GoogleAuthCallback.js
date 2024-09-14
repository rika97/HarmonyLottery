import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GoogleAuthCallback = () => {
  const location = useLocation();
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('access_token');
    if (token) {
      verifySubscription(token);
    } else {
      setStatus('Authentication failed.');
    }
  }, [location]);

  const verifySubscription = async (token) => {
    try {
      const result = await axios.post('https://hod1-a52bc53a961e.herokuapp.com/verifyYouTubeSubscription', {
        token,
        channelId: 'UCDfuhS7xu69IhK5AJSyiF0g'
      });
      if (result.data.success) {
        setStatus('User is subscribed to the channel');
      } else {
        setStatus('User is not subscribed to the channel');
      }
    } catch (error) {
      console.error('Error verifying subscription:', error);
      setStatus('Error verifying subscription');
    }
  };

  return (
    <div>
      <h1>{status}</h1>
    </div>
  );
};

export default GoogleAuthCallback;
