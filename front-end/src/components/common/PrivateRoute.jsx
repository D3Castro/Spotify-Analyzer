import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('../home/Home'));

const PrivateRoute = ({ user }) => {
    return user?.id ? <Home user={user} /> : <Navigate to="/" replace />;
  };

export default PrivateRoute;