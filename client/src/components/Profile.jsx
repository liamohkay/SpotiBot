import React from 'react';

// Displays user spotify profile info (picture, name, id, followers)
export default function Profile({ profile }) {
  return (
    <span id="profile">
      <span id="display-name">{profile.display_name}</span>
      <img id="profile-pic" src={profile.images[0].url} />
    </span>
  );
}