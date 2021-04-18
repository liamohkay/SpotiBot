// Libraries + dependencies
import axios from 'axios';
import React from 'react';
import { useFirebase } from './contexts/FirebaseContext.js';
import useText from '../hooks/useText.js';

export const Login = () => {
  const { login, currentUser } = useFirebase();
  const [text, setText] = useText({
    email: '',
    password: ''
  });

  return (
    <div id="login" className="container">
      <h1>{ JSON.strigfy(text) }</h1>
    </div>
  );
}