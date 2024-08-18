import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'

function ProtectedRoute({ children }) {

   const isAuthenticated = Cookies.get('user')
  const location = useLocation()

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthenticated && isAuthRoute) {
    return <Navigate to="/generate" />;
  }

  if (!isAuthenticated && !isAuthRoute) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;