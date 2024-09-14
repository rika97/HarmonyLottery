import React from 'react';

const GoogleLoginButton = () => {
  const handleLoginClick = () => {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = 'https://hod1.netlify.app/auth/google/callback';
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/youtube.readonly`;

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.open(googleAuthUrl);
    } else {
      window.location.href = googleAuthUrl;
    }
  };
  

  return (
    <button onClick={handleLoginClick}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
