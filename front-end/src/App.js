import React from 'react';
import { BrowserRouter } from "react-router-dom";

import AuthDataProvider from './components/common/AuthProvider';
import Router from './components/common/Router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthDataProvider>
          <Router />
        </AuthDataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;