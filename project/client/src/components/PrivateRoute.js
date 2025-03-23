import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // If auth is loading, show loading spinner
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If not authenticated, redirect to login with return path
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the children
  return children;
};

export default PrivateRoute;
