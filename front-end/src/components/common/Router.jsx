import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import DarkTheme from '../../themes/dark';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthDataContext } from './AuthProvider';
import TopMenu from '../topmenu/TopMenu';
import UserDropDown from '../dropdowns/UserDropDown';
import PrivateRoute from './PrivateRoute';

const LandingPage = lazy(() => import('../landingpage/LandingPage'));

const Router = () => {
  const {
    user,
    onLogout,
    isLoading,
    redirectToSpotify
  } = useContext(AuthDataContext);

  const userDropDown = <UserDropDown handleLogout={onLogout} />;

  return (
    <ThemeProvider theme={DarkTheme}>
      <TopMenu user={user} userDropDown={userDropDown} />
      <CssBaseline />
      <main>
        {isLoading ? (
          <Backdrop open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <Suspense fallback={<Backdrop open={true}><CircularProgress color="inherit" /></Backdrop>}>
            <Routes>
              <Route path="/" element={<LandingPage user={user} redirectToSpotify={redirectToSpotify} />} />
              <Route path="/home" element={<PrivateRoute user={user} />} />
            </Routes>
          </Suspense>
        )}
      </main>
    </ThemeProvider>
  );
};

export default Router;
