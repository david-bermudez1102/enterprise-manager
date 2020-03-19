import React from "react";

const Avatar = ({ currentUser, minimized, width }) =>
  currentUser.avatar ? (
    <img
      src={`http://localhost:3001/${currentUser.avatar}`}
      style={{ width }}
      alt={currentUser.name}
    />
  ) : (
    <i
      className={`fas fa-user-circle ${!minimized ? "mr-2" : null}`}
      style={{ fontSize: width }}></i>
  );
export default Avatar;
