import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess }) => {
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    window.location.href = `/auth/google/callback?access_token=${token}`;
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      ux_mode="redirect"
      onSuccess={handleLoginSuccess}
      onError={(error) => console.error('Login Failed:', error)}
    />
  );
};

export default GoogleLoginButton;
