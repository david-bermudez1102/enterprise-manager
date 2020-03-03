import React, { Component } from "react";
import { Link } from "react-router-dom";

class Options extends Component {
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

  render() {
    const { content, url } = this.props;
    const { isOpen } = this.state;
    return (
      <div
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        className="w-100"
      >
        <div
          className="d-flex justify-content-between"
          style={{
            minWidth: "80px",
            visibility: isOpen ? "visible" : "hidden"
          }}
        >
          <Link to={`${url}/${content.id}/delete`}>
            <i className="fad fa-trash" style={{ fontSize: "18px" }}></i>
          </Link>
          <Link to={`${url}/${content.id}/edit`}>
            <i className="fad fa-edit" style={{ fontSize: "18px" }}></i>
          </Link>
        </div>
      </div>
    );
  }
}
export default Options;
