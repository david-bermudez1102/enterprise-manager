import React from "react";
import defaultAvatar from "../../default_user.png";
import Draggable from "./Draggable";

const AvatarUploader = ({ title, filePreview, handleCoordinates, x, y }) =>
  filePreview !== "" ? (
    <Draggable x={x} y={y} handleCoordinates={handleCoordinates}>
      <img src={filePreview} title={title} alt={title} />
    </Draggable>
  ) : (
    <img
      src={defaultAvatar}
      width="100%"
      style={{ cursor: "pointer" }}
      title={title}
      alt={title}
    />
  );

export default AvatarUploader;
