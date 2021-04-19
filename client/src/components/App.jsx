// Libraries + dependencies
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext.js';
import { SpotifyProvider } from '../contexts/SpotifyContext.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Dashboard from './Dashboard.jsx';
import LoginSignup from './LoginSignup.jsx';
import LinkSpotify from './LinkSpotify.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const App = () => {

  return (
  <>
    <AuthProvider>
      <SpotifyProvider>
        <Router>
          <Switch>
            <Route exact path="/login" render={() => <LoginSignup />} />
            <Route exact path="/link" render={() => <LinkSpotify />} />
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
        </Router>
      </SpotifyProvider>
    </AuthProvider>
  </>
  );
};

export default App;
