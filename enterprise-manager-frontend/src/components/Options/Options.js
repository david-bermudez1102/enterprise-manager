import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DeletionModal } from "../Modal/Modals";
import ToggleContent from "../ToggleContent";

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
    const { content, url, fontSize, deletionMessage } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <div
          onMouseOver={this.handleOpen}
          onMouseOut={this.handleClose}
          className="w-100 d-flex justify-content-between align-items-center">
          <label htmlFor={content.name} className="p-0 m-0">
            {this.contentName()}
          </label>
          <div
            className="d-flex justify-content-between"
            style={{
              minWidth: "40px",
              visibility: isOpen ? "visible" : "hidden"
            }}>
            <Link to={`${url}/${content.id}/edit`}>
              <button className="btn btn-transparent text-primary px-0">
                <i className="fad fa-edit" style={{ fontSize: fontSize }}></i>
              </button>
            </Link>
            <ToggleContent
              toggle={show => (
                <button
                  className="btn btn-transparent text-primary px-0"
                  onClick={show}>
                  <i
                    className="fad fa-trash"
                    style={{ fontSize: fontSize }}></i>
                </button>
              )}
              content={hide => (
                <DeletionModal
                  {...this.props}
                  handleClose={hide}
                  deletionMessage={deletionMessage}>
                  <Link to={`${url}/${content.id}/delete`}>
                    <button type="button" className="btn btn-danger">
                      Delete column and field
                    </button>
                  </Link>
                </DeletionModal>
              )}
            />
          </div>
        </div>
      </>
    );
  }
}

Options.defaultProps = { fontSize: "14px" };
