import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GoogleAuthCallback = () => {
  const location = useLocation();
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  useEffect(() => {
    const getAccessTokenFromHash = () => {
      const hash = location.hash.substring(1);
      const params = new URLSearchParams(hash);
      return params.get('access_token');
    };

    const token = getAccessTokenFromHash();
    if (token) {
      verifySubscription(token);
    }
  }, [location]);

  const verifySubscription = async (token) => {
    try {
      const result = await axios.post('https://hod1-a52bc53a961e.herokuapp.com/verifyYouTubeSubscription', {
        token,
        channelId: 'UCDfuhS7xu69IhK5AJSyiF0g'
      });

      if (result.data.success) {
        setSubscriptionStatus('Successfuly verified subscription.');
      } else {
        setSubscriptionStatus('You are not subscribed to the channel.');
      }
    } catch (error) {
      console.error('Error verifying subscription:', error);
      setSubscriptionStatus(`Error verifying subscription: ${error}`);
    }
  };

  const redirectToTelegram = () => {
    window.location.href = 'tg://resolve?domain=HarmonySocialBot';
  };

  return (
    <div>
      <h1>Processing authentication...</h1>
      <p>{subscriptionStatus}</p>
      <button onClick={redirectToTelegram}>Go Back to App</button>
    </div>
  );
};

export default GoogleAuthCallback;