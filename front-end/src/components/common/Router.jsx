import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';

import { registerSpotify } from '../../util/auth';
import { AuthDataContext } from './AuthProvider';
import { getUrlParams } from '../../util/url';
import Redirect from './Redirect';
import TopMenu from '../topmenu/TopMenu';
import UserDropDown from '../dropdowns/UserDropDown';

const Home = lazy(() => import('../home/Home'));
const LandingPage = lazy(() => import('../landingpage/LandingPage'));

const PrivateRoute = ({ user, children }) => {
  return user && user.id ? children : <Navigate to="/" replace />;
};

const Router = () => {
  const {
    user,
    onLogin,
    onLogout,
    isLoading,
    redirectUrl,
    redirectToSpotify
  } = useContext(AuthDataContext);
  
  const [code, setCode] = useState(null);

  useEffect(() => {
    const params = getUrlParams();
    const codeParam = params.code || null;
    setCode(codeParam);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        try {
          const user = await registerSpotify(code);
          onLogin(user);
        } catch (error) {
          console.error('Error during registration:', error);
        }
      }
    };
    fetchData();
  }, [code, onLogin]);

  const userDropDown = <UserDropDown handleLogout={onLogout} />;

  return (
    <>
      <TopMenu user={user} userDropDown={userDropDown} />
      <CssBaseline />
      <main>
        {isLoading ? (
          <Backdrop open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : redirectUrl ? (
          <Redirect url={redirectUrl} />
        ) : (
          <Suspense fallback={<Backdrop open={true}><CircularProgress color="inherit" /></Backdrop>}>
            <Routes>
              <Route path="/" element={<LandingPage user={user} redirectToSpotify={redirectToSpotify} />} />
              <Route path="/home" element={<PrivateRoute user={user}> <Home user={user} /> </PrivateRoute>} />
            </Routes>
          </Suspense>
        )}
      </main>
    </>
  );
};

export default Router;
