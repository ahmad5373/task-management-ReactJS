import React from 'react';

const NotFoundPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#FF4040' }}>404</h1>
      <p style={{ fontSize: '1.5rem' }}>Page not found</p>
    </div>
  );
};

export default NotFoundPage;
