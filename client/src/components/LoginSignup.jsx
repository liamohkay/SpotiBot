// Libraries + dependencies
import axios from 'axios';
import React from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import useText from '../hooks/useText.js';

const Login = () => {
  const { login, signup } = useAuth();
  const [text, setText] = useText({
    email: '',
    password: ''
  });

  // onClick events for login + signup buttons
  const handleLogin = () => {
    login(text.email, text.password)
      .then(() => console.log('Signin successful'))
      .catch(err => console.log(err))
  }

  const handleSignup = () => {
    signup(text.email, text.password)
      .then(resp => alert(`Account created for ${resp.user.email}`))
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