import React, { useState, useEffect } from "react";
const DraggableOption = ({ children, onDragEnd }) => {
  const [dragging, setDragging] = useState(false);
  const [beingDraggedBy, setBeingDraggedBy] = useState(null);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    setArr(Array.from({ length: children.length }, (k, i) => i));
  }, [children]);

  const handleDragStart = id => {
    setBeingDraggedBy(id);
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
    setBeingDraggedBy(null);
  };

  const handleDragEnd = () => {
    setDragging(false);
    setBeingDraggedBy(null);
  };

  const handleDrop = e => {
    setDragging(false);
    setBeingDraggedBy(null);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = id => {
    if (id !== beingDraggedBy) {
      const tmp = [...arr];

      tmp.splice(beingDraggedBy, 1);
      tmp.splice(id, 0, beingDraggedBy);
      setBeingDraggedBy(id);
      setArr(tmp);
    }
  };

  console.log(dragging);
  return children.map((child, i) =>
    React.cloneElement(child, {
      onDrop: handleDrop,
      onDragStart: () => handleDragStart(i),
      onMouseUp: handleMouseUp,
      onDragEnd: handleDragEnd,
      onDragEnter: dragging ? () => handleDragEnter(i) : undefined,
      draggable: true,
      onDragOver: handleDragOver,
      style: { opacity: dragging && i === beingDraggedBy ? 0.3 : 1 }
    })
  );
};

export default DraggableOption;
