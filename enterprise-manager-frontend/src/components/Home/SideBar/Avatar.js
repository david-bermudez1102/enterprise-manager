import React from "react";
import defaultAvatar from "../../../default_user.png";

const Avatar = ({ currentUser, size }) => {
  return (
    <div
      className="circular--landscape mr-2 shadow"
      style={{
        width: size + "px",
        height: size + "px"
      }}>
      {currentUser.avatar ? (
        <div
          className="w-100 h-100"
          style={{
            marginLeft: (currentUser.avatar.margin_left * size) / 150 + "px",
            marginTop: (currentUser.avatar.margin_top * size) / 150 + "px"
          }}>
          <img
            src={`http://localhost:3001/${currentUser.avatar.url}`}
            alt={currentUser.name}
            className="d-flex"
          />
        </div>
      ) : (
        <img src={defaultAvatar} />
      )}
    </div>
  );
};
export default Avatar;
