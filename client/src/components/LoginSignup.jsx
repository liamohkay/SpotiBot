// Libraries + dependencies
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import { db } from '../firebase/firebase.js';
import useText from '../hooks/useText.js';

const Login = () => {
  const { login, signup } = useAuth();
  const history = useHistory();
  const [text, setText] = useText({ email: '', password: '' });

  // Authenticates existing user w/ firebase
  const handleLogin = () => {
    login(text.email, text.password)
      .then(() => history.push('/link'))
      .catch(err => console.log(err))
  }

  // Creates firebase user & database entry w/ uid to store playlist info
  const handleSignup = () => {
    signup(text.email, text.password)
      .then(resp => {
        db.collection('users').doc(resp.user.uid).set({ playlists: [] });
        alert(`Account created for ${resp.user.email}`);
        history.push('/link');
      })
      .catch(err => console.log(err))
  }

  return (
    <div id="login" className="container">
      <h1>SpotiBot</h1>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={setText}></input>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={setText}></input>
      </form>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Login;