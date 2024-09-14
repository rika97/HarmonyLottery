import React, { useState } from 'react';
import GoogleLoginButton from './oAuth/GoogleLoginButton';
import axios from 'axios';

const SocialTasks = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleSuccess = async (response) => {
    console.log('User authenticated:', response);
    try {
      const result = await axios.post('https://hod1-a52bc53a961e.herokuapp.com/verifyYouTubeSubscription', {
        token: response.access_token,
        channelId: 'UCDfuhS7xu69IhK5AJSyiF0g'
      });

      if (result.data.success) {
        setSubscriptionStatus('User is subscribed to the channel');
      } else {
        setSubscriptionStatus('User is not subscribed to the channel');
      }
    } catch (error) {
      console.error('Error verifying subscription:', error);
      setSubscriptionStatus('Error verifying subscription');
    }
  };

  return (
    <div>
      <h1>Social Tasks</h1>
      <h2>Subscribe to YouTube</h2>
      <GoogleLoginButton onSuccess={handleSuccess} />
      <p>{subscriptionStatus}</p>
    </div>
  );
};

export default SocialTasks;
