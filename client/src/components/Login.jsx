import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '/client/src/contexts/AuthContext.js';
import useInput from '/client/src/hooks/useInput.js';

export default function Login() {
  const history = useHistory();
  const { login, signup } = useAuth();
  const [input, setInput] = useInput({ email: '', password: '' });

  // Authenticates existing user w/ firebase
  const handleLogin = () => {
    login(input.email, input.password)
      .then(() => history.push('/link'))
      .catch(err => alert(err.message))
  }

  // Creates new user & stores in firebase
  const handleSignup = () => {
    signup(input.email, input.password)
      .then(resp => {
        alert(`Account created for ${resp.user.email}`);
        history.push('/link');
      })
      .catch(err => alert(err.message))
  }

  return (
    <div className="container flex">
      <div id="login-card" className="flex">
        <h1>SpotiBot</h1>
        <form id="login-inputs" className="flex">
          <input type="text" name="email" placeholder="Email" onChange={setInput}></input>
          <input type="password" name="password" placeholder="Password" onChange={setInput}></input>
        </form>
        <div id="login-btns" className="flex">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
}