// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Only import what's needed
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return user ? <Element {...rest} /> : <Navigate to="/Login" replace />;
};

export default PrivateRoute;