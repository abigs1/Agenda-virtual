import { Navigate } from 'react-router-dom';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const isOwner = localStorage.getItem('isOwner') === 'true';

  if (!isOwner) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
