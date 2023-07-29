import React, { useState, useEffect, createContext } from 'react';
import { getSpotifyUser, getLoginRedirect, logout, registerSpotify } from '../../util/auth';
import { getUrlParams } from '../../util/url';

const AuthDataContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      setUser({});
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToSpotify = async () => {
    try {
      const redirect = await getLoginRedirect();
      window.location.href = redirect;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = getUrlParams();
    const codeParam = params.code || null;

    const fetchData = async () => {
      setIsLoading(true);
      if (codeParam) {
        try {
          const user = await registerSpotify(codeParam);
          setUser(user);
        } catch (error) {
          console.error('Error during registration:', error);
        }
      } else {
        try {
          const authData = await getSpotifyUser();
          if (authData) {
            setUser(authData);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <AuthDataContext.Provider
      value={{
        user,
        isLoading,
        onLogout: handleLogout,
        redirectToSpotify,
      }}
    >
      {children}
    </AuthDataContext.Provider>
  );
};

export { AuthDataContext, AuthProvider };
