import React, { useState, useEffect, createContext } from 'react';
import { getSpotifyUser, getLoginRedirect, logout } from '../../util/auth';

const AuthDataContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authData = await getSpotifyUser();
        if (authData) {
            setUser(authData);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    const logoutUser = async () => {
      try {
        await logout();
        setUser({});
      } catch (error) {
        console.log(error);
      }
    };

    logoutUser();
  };

  const redirectToSpotify = () => {
    const redirect = async () => {
      try {
        const redirect = await getLoginRedirect();
        setRedirectUrl(redirect);
      } catch (error) {
        console.log(error);
      }
    };

    redirect();
  };

  return (
    <AuthDataContext.Provider
      value={{
        user,
        isLoading,
        redirectUrl,
        onLogin: handleLogin,
        onLogout: handleLogout,
        redirectToSpotify,
      }}
    >
      {children}
    </AuthDataContext.Provider>
  );
};

export { AuthDataContext, AuthProvider };