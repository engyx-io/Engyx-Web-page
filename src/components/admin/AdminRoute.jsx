import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { ADMIN_EMAILS } from '@/config';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAuthorized = user && ADMIN_EMAILS.includes(user.email);

  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;