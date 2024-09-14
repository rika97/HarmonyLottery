import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess }) => {
  const handleSuccess = (response) => {
    onSuccess(response);
  };

  const handleFailure = (response) => {
    console.error('Login failed:', response);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      scope="https://www.googleapis.com/auth/youtube.readonly"
    />
  );
};

export default GoogleLoginButton;
