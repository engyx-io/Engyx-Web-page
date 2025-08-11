import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Loader from '@/components/Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return <Loader />;
  }

  if (!user) {
  return <Navigate to="/get-started" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;