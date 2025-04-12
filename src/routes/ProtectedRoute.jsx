import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * A higher-order component that protects routes from being accessed
 * without authentication. Redirects to the login page if no token is found.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to render if authenticated.
 * @returns {React.ReactNode} The protected content or a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
