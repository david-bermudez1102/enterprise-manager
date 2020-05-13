import React from "react";
import defaultAvatar from "../../../default_user.png";

const Avatar = ({ currentUser, size }) => {
  return (
    <div
      className="circular--landscape shadow"
      style={{
        width: size + "px",
        height: size + "px",
      }}>
      {currentUser.avatar ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            marginLeft: (currentUser.avatar.margin_left * size) / 150 + "px",
            marginTop: (currentUser.avatar.margin_top * size) / 150 + "px",
          }}>
          <img
            src={`http://localhost:3001/${currentUser.avatar.url}`}
            alt={currentUser.name}
            title={currentUser.name}
            style={{ display: "flex " }}
          />
        </div>
      ) : (
        <img
          src={defaultAvatar}
          alt={currentUser.name}
          title={currentUser.name}
        />
      )}
    </div>
  );
};
export default Avatar;
