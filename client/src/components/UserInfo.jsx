// Libraries & dependencies
import axios from 'axios';
import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <>
      { !user ? null : (
        <div id="user-container">
          <img id="profile-pic" src={user.images[0].url}/>
          <div>
            <div id="display-name">{user.display_name}</div>
            <div id="username">@{user.id}</div>
            <div id="followers">Followers: {user.followers.total}</div>
          </div>
        </div>
      ) }
    </>
  );
}

export default UserInfo;