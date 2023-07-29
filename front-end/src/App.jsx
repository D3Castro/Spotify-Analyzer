import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/common/AuthProvider';
import Router from './components/common/Router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;