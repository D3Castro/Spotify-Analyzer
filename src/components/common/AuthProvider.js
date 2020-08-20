import React, { createContext, useState, useEffect, useMemo } from "react";
import { getSpotifyUser, getLoginRedirect, logout } from '../../util/auth';

export const AuthDataContext = createContext(null);

const initialAuthData = {};

const AuthDataProvider = props => {
  const [user, setUser] = useState(initialAuthData);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    async function setAuthData() {
      const authData = await getSpotifyUser();
      if (authData) {
          setUser(authData);
      }
      setIsLoading(false);
    }

    setAuthData()
  }, []);

  const onLogout = async () => {
    setUser('Not logged in');
    await logout()
  }

  const redirectToSpotify = async () => {
    const redirect = await getLoginRedirect();
    setRedirectUrl(redirect);
  };

  const onLogin = newAuthData => setUser(newAuthData);

  const authDataValue = useMemo(() => ({ user, isLoading, redirectUrl, redirectToSpotify, onLogin, onLogout }), [user, isLoading, redirectUrl]);

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export default AuthDataProvider;