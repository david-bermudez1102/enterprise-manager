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

  render() {
    const { content, url, fontSize, deletionMessage, style } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <div
          onMouseOver={this.handleOpen}
          onMouseOut={this.handleClose}
          className="d-flex justify-content-end align-items-center position-absolute px-2"
          style={{ right: 0, zIndex: 2, ...style }}>
          <div
            className="d-flex justify-content-between bg-white"
            style={{
              minWidth: "40px",
              visibility: isOpen ? "visible" : "hidden"
            }}>
            <Link to={`${url}/${content.id}/edit`}>
              <button className="btn btn-transparent text-primary p-0">
                <i className="fad fa-edit" style={{ fontSize: fontSize }}></i>
              </button>
            </Link>
            <ToggleContent
              toggle={show => (
                <button
                  className="btn btn-transparent text-primary p-0"
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
