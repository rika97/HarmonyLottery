import React, { useState } from 'react';

const GoogleLoginButton = () => {
  const [debugMessage, setDebugMessage] = useState('');

  const handleLoginClick = () => {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = 'https://hod1.netlify.app/auth/google/callback';
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly`;

    setDebugMessage('Button clicked');

    if (window.Telegram && window.Telegram.WebApp) {
      setDebugMessage('Opening in system browser using Telegram WebApp');
      try {
        window.Telegram.WebApp.open(googleAuthUrl);
      } catch (error) {
        setDebugMessage(`Error opening system browser: ${error.message}`);
      }
    } else {
      setDebugMessage('Opening in the current browser window');
      try {
        window.location.href = googleAuthUrl;
      } catch (error) {
        setDebugMessage(`Error navigating to URL: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <button onClick={handleLoginClick}>
        Login with Google
      </button>
      <p>{debugMessage}</p>
    </div>
  );
};

export default GoogleLoginButton;
