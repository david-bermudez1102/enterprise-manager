import React from "react";
import defaultAvatar from "../../default_user.png";
import Draggable from "./Draggable";

const AvatarUploader = ({ filePreview, handleCoordinates, x, y }) =>
  filePreview !== "" ? (
    <Draggable x={x} y={y} handleCoordinates={handleCoordinates}>
      <img src={filePreview} />
    </Draggable>
  ) : (
    <img src={defaultAvatar} width="100%" />
  );

export default AvatarUploader;
