import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess }) => {
  const handleLoginSuccess = (response) => {
    window.location.href = `/auth/google/callback?access_token=${response.access_token}`;
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      onSuccess={handleLoginSuccess}
      onFailure={(error) => console.error('Login Failed:', error)}
    />
  );
};

export default GoogleLoginButton;
