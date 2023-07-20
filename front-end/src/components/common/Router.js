import React, { Component, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';

import { registerSpotify } from '../../util/auth';
import { AuthDataContext } from "./AuthProvider";
import { getUrlParams } from '../../util/url';
import Redirect from './Redirect';
import DarkTheme from '../../themes/dark';
import TopMenu from '../topmenu/TopMenu';
import UserDropDown from '../dropdowns/UserDropDown';

const Home = lazy(() => import('../home/Home'));
const LandingPage = lazy(() => import('../landingpage/LandingPage'));

const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
  return isAuthenticated ? children : <Navigate to="/" replace />;
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
                <Route path="/" restricted={true} user={user} redirectToSpotify={redirectToSpotify} element={<LandingPage />} />
                <Route path="/home" element={<PrivateRoute auth={{ isAuthenticated: false }}> <Home user={user} /> </PrivateRoute>} />
              </Routes>
            </Suspense>
        </main>
      </MuiThemeProvider>
    );
  }
}

export default Router;