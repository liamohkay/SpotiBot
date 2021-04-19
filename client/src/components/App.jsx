// Libraries + dependencies
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext.js';
import { PlaylistProvider } from '../contexts/PlaylistContext.js';
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
      <PlaylistProvider>
        <Router>
          <Switch>
            <Route exact path="/login" render={() => <LoginSignup />} />
            <Route exact path="/link" render={() => <LinkSpotify />} />
            <PrivateRoute exact path="/" component={Dashboard} />
          </Switch>
        </Router>
      </PlaylistProvider>
    </AuthProvider>
  </>
  );
};

export default App;
