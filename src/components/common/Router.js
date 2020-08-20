import React, { Component, Suspense, lazy } from 'react';
import { Switch } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';

import { registerSpotify } from '../../util/auth';
import { AuthDataContext } from "./AuthProvider";
import { getUrlParams } from '../../util/url';
import Redirect from '../common/Redirect';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import DarkTheme from '../../themes/dark';
import TopMenu from '../topmenu/TopMenu';
import UserDropDown from '../dropdowns/UserDropDown';

const Home = lazy(() => import('../home/Home'));
const LandingPage = lazy(() => import('../landingpage/LandingPage'));

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
        <Backdrop>
            <CircularProgress color="inherit" />
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
              <Switch>
                <PublicRoute path="/" exact
                  restricted={true} user={user} redirectToSpotify={redirectToSpotify} component={LandingPage}
                />
                <PrivateRoute path="/home" exact
                  user={user} component={Home}
                />
              </Switch>
            </Suspense>
        </main>
      </MuiThemeProvider>
    );
  }
}

export default Router;