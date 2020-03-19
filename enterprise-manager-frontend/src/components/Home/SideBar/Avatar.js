import React from "react";
import defaultAvatar from "../../../default_user.png";

const Avatar = ({ currentUser, size }) =>
  currentUser.avatar ? (
    <img
      src={`http://localhost:3001/${currentUser.avatar}`}
      style={{ width: size }}
      alt={currentUser.name}
    />
  ) : (
    <div className="circular--landscape mr-2 shadow" style={{ width: size, height: size }}>
      <img src={defaultAvatar} />
    </div>
  );
export default Avatar;
