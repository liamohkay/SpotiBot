// Libraries + dependencies
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext.js';
import { SpotifyProvider } from '../contexts/SpotifyContext.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import LinkSpotify from './LinkSpotify.jsx';
import PrivateRoute from './PrivateRoute.jsx';

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