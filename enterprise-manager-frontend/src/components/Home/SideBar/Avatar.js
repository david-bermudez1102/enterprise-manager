import React from "react";
import defaultAvatar from "../../../default_user.png";

const Avatar = ({ currentUser, size }) => (
  <div className="circular--landscape mr-2 shadow" style={{ width: size, height: size }}>
    {currentUser.avatar ? (
      <img
        src={`http://localhost:3001/${currentUser.avatar.url}`}
        style={{ width: size }}
        alt={currentUser.name}
      />
    ) : (
      <img src={defaultAvatar} />
    )}
  </div>
);
export default Avatar;
