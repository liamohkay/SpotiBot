import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Displays user spotify profile info (picture, name, id, followers)
export default function Profile({ profile }) {
  return (
    <div id="profile" className="flex">
      <img id="profile-pic" src={profile.images[0].url} />
      <div id="profile-info" className="flex">
        <div id="display-name">{profile.display_name}</div>
        <div id="username">@{profile.id}</div>
        <div id="followers">Followers: {profile.followers.total}</div>
      </div>
    </div>
  );
}