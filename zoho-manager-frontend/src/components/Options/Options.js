import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DeletionModal } from "../Modal/Modals";

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, showModal: false };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleShowModal = event => {
    event.preventDefault();
    this.setState({ showModal: true });
  };

  handleCloseModal = event => {
    event.preventDefault();
    this.setState({ showModal: false });
  };

  contentName = () => {
    const { content } = this.props;
    return content.name
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
      .join(" ");
  };

  render() {
    const { content, url, fontSize, deletionMessage } = this.props;
    const { isOpen, showModal } = this.state;
    return (
      <>
        {showModal ? (
          <DeletionModal {...this.props} handleClose={this.handleCloseModal}>
            {deletionMessage}
          </DeletionModal>
        ) : null}
        <div
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          className="w-100 d-flex justify-content-between align-items-end">
          <label htmlFor={content.name}>{this.contentName()}</label>
          <div
            className="d-flex justify-content-between"
            style={{
              minWidth: "40px",
              visibility: isOpen ? "visible" : "hidden"
            }}>
            <button
              className="btn btn-transparent text-primary px-0"
              onClick={this.handleShowModal}>
              <i className="fad fa-trash" style={{ fontSize: fontSize }}></i>
            </button>
            <Link to={`${url}/${content.id}/edit`}>
              <button className="btn btn-transparent text-primary px-0">
                <i className="fad fa-edit" style={{ fontSize: fontSize }}></i>
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

Options.defaultProps = { fontSize: "18px" };
