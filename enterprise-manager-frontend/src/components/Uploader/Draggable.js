import React, { Component } from "react";

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      dragging: false,
      x: 0,
      y: 0,
      xRel: 0,
      yRel: 0,
      prevX: 0,
      prevY: 0,
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
    if (this.state.dragging) this.setState({ x: e.pageX - xRel, y: e.pageY - yRel });
  };

  handleClick = e => {
    if (this.state.moved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  render() {
    console.log(this.state);
    const { children } = this.props;
    return (
      <div
        className="d-flex w-100 h-100"
        ref={this.container}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onClick={this.handleClick}
        style={{
          marginLeft: this.state.x + "px",
          marginTop: this.state.y + "px"
        }}>
        {children}
      </div>
    );
  }
}
