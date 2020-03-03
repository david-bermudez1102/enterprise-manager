import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  contentName = () => {
    const { content } = this.props;
    return content.name
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
      .join(" ");
  };

  render() {
    const { content, url, fontSize } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        className="w-100 d-flex justify-content-between"
      >
        <label htmlFor={content.name}>{this.contentName()}</label>
        <div
          className="d-flex justify-content-between"
          style={{
            minWidth: "40px",
            visibility: isOpen ? "visible" : "hidden"
          }}
        >
          <Link to={`${url}/${content.id}/delete`}>
            <i className="fad fa-trash" style={{ fontSize: fontSize }}></i>
          </Link>
          <Link to={`${url}/${content.id}/edit`}>
            <i className="fad fa-edit" style={{ fontSize: fontSize }}></i>
          </Link>
        </div>
      </div>
    );
  }
}

Options.defaultProps = { fontSize: "18px" };
