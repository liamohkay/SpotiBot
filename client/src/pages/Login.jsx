import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '/client/src/contexts/AuthContext.js';
import useInput from '../utils/useInput.js';
import LogoBrand from '../components/LogoBrand.jsx';

export default function Login() {
  const history = useHistory();
  const { login, signup } = useAuth();
  const [input, setInput] = useInput({
    email: '',
    password: '',
    newEmail: '',
    newPass: '',
    newPassMatch: ''
  });

  // Triggers an automated email
  const sendConfirmation = async (email) => {
    try {
      await axios.post('/confirmationEmail', { email })
      alert(console.log(`Signup confirmation sent to: ${email}.`));
    } catch (err) {
      console.error(err);
    }
  }

  // Authenticates existing user w/ firebase
  const handleLogin = () => {
    login(input.email, input.password)
      .then(() => history.push('/link'))
      .then(() => sendConfirmation(input.email))
      .catch(err => alert(err.message))
  }

  // Creates new user & stores in firebase
  const handleSignup = () => {
    if (input.newPass !== input.newPassMatch) {
      alert('Passwords don\'t match');
      return;
    } else {
      history.push('/link');
      signup(input.newEmail, input.newPass)
        .then(resp => {
          alert(`Account created for ${resp.user.email}.\nPlease link your Spotify account.`);
          sendConfirmation(resp.user.email);
          history.push('/link');
        })
        .catch(err => alert(err.message))
    }
  }

  return (
    <div className="flex border-bg">
      <div className="nav-bg">
        <LogoBrand />
        <section id="login-nav-section" className="flex slide-right-to-left">
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
        </section>

      </div>

      <main className="main-bg">
        <section id="main-login">
          <h1>Create an Account</h1>
          <input
            className="text-input"
            type="text"
            name="newEmail"
            placeholder="New Email"
            onChange={setInput}
          />
          <input
            className="text-input"
            type="password"
            name="newPass"
            placeholder="New Password"
            onChange={setInput}
          />
          <input
            className="text-input"
            type="password"
            name="newPassMatch"
            placeholder="Confirm New Password"
            onChange={setInput}
          />
          <button onClick={handleSignup}>Signup</button>
        </section>
      </main>
    </div>
  );
}