// Libraries + dependencies
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import useText from '../hooks/useText.js';

const Login = () => {
  const { login, signup } = useAuth();
  const history = useHistory();
  const [text, setText] = useText({ email: '', password: '' });

  // onClick events for login + signup buttons
  const handleLogin = () => {
    login(text.email, text.password)
      .then(() => history.push('/link'))
      .catch(err => console.log(err))
  }

  const handleSignup = () => {
    signup(text.email, text.password)
      .then(resp => {
        alert(`Account created for ${resp.user.email}`);
        history.push('/link');
      })
      .catch(err => console.log(err))
  }

  return (
    <div id="login" className="container">
      <h1>SpotiBot</h1>
      <label htmlFor="email">Email</label>
      <input type="text" name="email" onChange={setText}></input>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={setText}></input>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Login;