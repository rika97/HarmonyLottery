import React, { useState } from 'react';

const GoogleLoginButton = () => {
  const [debugMessage, setDebugMessage] = useState('');

  const handleLoginClick = () => {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = 'https://hod1.netlify.app/auth/google/callback';

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly&prompt=select_account`;

    setDebugMessage('Button clicked');

    try {
      setDebugMessage('Trying to open Google OAuth URL in system browser');
      window.open(googleAuthUrl, '_blank');
    } catch (error) {
      setDebugMessage(`Error opening new window: ${error.message}`);
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