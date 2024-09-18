import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

const YouTubeLogin = () => {
  const youtubeChannelId = 'UCDfuhS7xu69IhK5AJSyiF0g';
  const subscribeUrl = `https://www.youtube.com/channel/${youtubeChannelId}?sub_confirmation=1`;

  return (
    <div>
      <h2>Subscribe to Our YouTube Channel</h2>
      <a href={subscribeUrl} target="_blank" rel="noopener noreferrer">
        <button>Subscribe Now</button>
      </a>
      <GoogleLoginButton />
    </div>
  );
};

export default YouTubeLogin;
