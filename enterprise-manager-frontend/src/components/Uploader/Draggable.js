import React, { Component } from "react";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = { dragging: false, x: 0, y: 0 };
  }

  handleMouseDown = e => {};

  render() {
    console.log(this.state);
    const { children } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          left: this.state.x + "px",
          top: this.state.y + "px"
        }}>
        {children}
      </div>
    );
  }
}
