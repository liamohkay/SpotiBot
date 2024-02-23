import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext.js';
import { SpotifyProvider } from '../contexts/SpotifyContext.js';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import LinkSpotify from '../pages/LinkSpotify.jsx';
import PrivateRoute from '../utils/PrivateRoute.jsx';

export default function App() {
  return (
    <>
      <AuthProvider>
        <SpotifyProvider>
          <Router>
            <Switch>
              <Route exact path="/login" render={() => <Login />} />
              <Route exact path="/link" render={() => <LinkSpotify />} />
              <PrivateRoute exact path="/" component={Dashboard} />
            </Switch>
          </Router>
        </SpotifyProvider>
      </AuthProvider>
    </>
  );
};