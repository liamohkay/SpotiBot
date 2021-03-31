// Libraries & dependencies
import axios from 'axios';
import React, { useState,  useEffect } from 'react';


const UserInfo = ({ token }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + token } })
      .catch(err => console.log(err))
      .then(resp => setUser(resp.data))
  }, [token])

  return (
    <div>
      { !user ? null : (
        <div id="user-container">
          <img id="profile-pic" src={user.images[0].url}/>
          <div id="display-name">{user.display_name}</div>
          <div id="username">{user.id}</div>
          <div id="followers">followers {user.followers.total}</div>
        </div>
      ) }
    </div>
  );
}

export default UserInfo;