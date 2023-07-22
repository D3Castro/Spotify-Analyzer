import React, { Component, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from '@mui/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';

import { registerSpotify } from '../../util/auth';
import { AuthDataContext } from "./AuthProvider";
import { getUrlParams } from '../../util/url';
import Redirect from './Redirect';
import DarkTheme from '../../themes/dark';
import TopMenu from '../topmenu/TopMenu';
import UserDropDown from '../dropdowns/UserDropDown';

const Home = lazy(() => import('../home/Home'));
const LandingPage = lazy(() => import('../landingpage/LandingPage'));

const PrivateRoute = ({ user, children }) => {
  return user.id ? children : <Navigate to="/" replace />;
};

class Router extends Component {
  static contextType = AuthDataContext;

  async componentDidMount() {
    const { onLogin } = this.context;
    const params = getUrlParams();
    const code = params.code || null;

    if (!code) return;
    const user = await registerSpotify(code);
    onLogin(user);
  };

  render() {
    const { user, onLogout, isLoading, redirectUrl, redirectToSpotify } = this.context;
    const userDropDown = <UserDropDown handleLogout={onLogout} />

    if (isLoading) {
      return (
        <Backdrop open={true}>
            <CircularProgress color="inherit"/>
        </Backdrop>
      )
    }

    if (redirectUrl) {
      return <Redirect url={redirectUrl} />
    }

    return (
      <MuiThemeProvider theme={DarkTheme}>
        <TopMenu
          user={user}
          userDropDown={userDropDown}
        />
        <CssBaseline />
        <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<LandingPage user={user} redirectToSpotify={redirectToSpotify} />} />
                <Route path="/home" element={<PrivateRoute user={user}> <Home user={user} /> </PrivateRoute>} />
              </Routes>
            </Suspense>
        </main>
      </MuiThemeProvider>
    );
  }
}

export default Router;