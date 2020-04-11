import React, { Component } from "react";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      dragging: false,
      x: props.x || 0,
      y: props.y || 0,
      xRel: 0,
      yRel: 0,
      prevX: props.x || 0,
      prevY: props.y || 0,
      moved: false
    };
  }

  handleMouseDown = e => {
    e.persist();
    e.stopPropagation();
    e.preventDefault();
    const container = this.container.current;
    this.setState(prevState => {
      return {
        dragging: true,
        xRel: e.pageX - container.offsetLeft,
        yRel: e.pageY - container.offsetTop,
        prevX: prevState.x,
        prevY: prevState.y
      };
    });
  };

  handleMouseUp = e => {
    e.persist();
    e.stopPropagation();
    e.preventDefault();
    const { x, prevX } = this.state;
    this.setState({
      dragging: false,
      moved: x !== prevX ? true : false
    });
  };

  handleMouseMove = e => {
    e.stopPropagation();
    e.preventDefault();
    const { xRel, yRel } = this.state;
    if (this.state.dragging)
      this.setState({ x: e.pageX - xRel, y: e.pageY - yRel }, () =>
        this.props.handleCoordinates(this.state.x, this.state.y)
      );
  };

  handleWheel = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  handleClick = e => {
    if (this.state.moved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  render() {
    const { className, children } = this.props;
    const { x, y } = this.state;
    return (
      <div
        className={`w-100 h-100 ${className}`}
        ref={this.container}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onWheel={this.handleWheel}
        onClick={this.handleClick}
        style={{
          marginLeft: x + "px",
          marginTop: y + "px",
          cursor: this.state.dragging ? "move" : "pointer"
        }}>
        {children}
      </div>
    );
  }
}
