import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import DarkTheme from './themes/dark.js';

import { AuthProvider } from './components/common/AuthProvider';
import Router from './components/common/Router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider theme={DarkTheme}>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </ThemeProvider>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
