// Libraries & dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSpotify } from '../contexts/SpotifyContext.js';

const ProfileInfo = ({ profile }) => {
  const { token } = useSpotify();

  return (
    <>
      { !profile ? null : (
        <div id="profile-container">
          <img id="profile-pic" src={profile.images[0].url}/>
          <div id="profile-info-container">
            <div id="display-name">{profile.display_name}</div>
            <div id="username">@{profile.id}</div>
            <div id="followers">Followers: {profile.followers.total}</div>
          </div>
        </div>
      ) }
    </>
  );
}

export default ProfileInfo;