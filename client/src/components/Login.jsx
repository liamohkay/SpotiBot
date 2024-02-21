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
    <div className="flex border-bg">
      <div className="nav-bg">

        <section id="login-nav-header">
          <img src="https://cdn.icon-icons.com/icons2/814/PNG/512/Spotify_icon-icons.com_66209.png" />
          <div>
            <h1>SpotiBot</h1>
            <p>Your digital digger</p>
          </div>
        </section>

        <main id="login-nav-main" className="flex">
          <form>
            <input
              className="text-input"
              type="text"
              name="email"
              placeholder="Email"
              onChange={setInput}
            />
            <input
              className="text-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={setInput}
            />
            <button onClick={handleLogin}>Login</button>
          </form>
        </main>

      </div>

      <div className="main-bg">
        {/* <img src="https://totallywiredmag.com/wp-content/uploads/2020/12/1280-jp-record-shelf-1.jpg" /> */}
        <button onClick={handleSignup}>Signup</button>
        {JSON.stringify(input)}
      </div>
    </div>
  );
}