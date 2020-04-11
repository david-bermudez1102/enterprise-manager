import React from "react";
import Draggable from "./Draggable";

const LogoUploader = ({ title, filePreview, handleCoordinates, x, y }) =>
  filePreview !== "" ? (
    <Draggable
      x={x}
      y={y}
      handleCoordinates={handleCoordinates}
      className="d-flex align-items-center justify-content-center">
      <img src={filePreview} title={title} alt={title} />
    </Draggable>
  ) : (
    <div
      className="w-100 h-100 d-flex align-items-center justify-content-center flex-wrap"
      style={{ cursor: "pointer", color: "#ccc" }}>
      <i className="fas fa-upload" style={{ fontSize: "140px" }}></i>
      <span className="w-100">Drag your company logo</span>
    </div>
  );

export default LogoUploader;
