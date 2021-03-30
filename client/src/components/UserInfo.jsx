// Libraries & dependencies
import axios from 'axios';
import React, { useState,  useEffect } from 'react';


const UserInfo = ({ token }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + token } })
      .catch(err => console.log(err))
      .then(resp => {
        setUser(resp.data)
        console.log(resp.data);
        console.log(resp.data.images[0].url);
        })
  }, [token])

  return (
    <div id="user-container">
      { !user ? null : (
        <img src={user.images[0].url}/>
      ) }
    </div>
  );
}

export default UserInfo;