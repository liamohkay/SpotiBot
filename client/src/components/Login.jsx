// Libraries + dependencies
import axios from 'axios';
import React from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import useText from '../hooks/useText.js';

const Login = () => {
  const { login, currentUser } = useAuth();
  const [text, setText] = useText({
    email: '',
    password: ''
  });

  return (
    <div id="login" className="container">
      <h1>{ JSON.stringify(text) }</h1>
    </div>
  );
}

export default Login;