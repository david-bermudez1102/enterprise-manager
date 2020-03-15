import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = { show: true, fadingOut: false };
  }

  fadeOut() {
    this.setState({ fadingOut: true });
  }

  render() {
    const { type, children } = this.props;
    if (type === "success")
      return (
        <CSSTransition
          in={this.state.show}
          timeout={1000}
          unmountOnExit
          classNames="fade"
          onExit={this.fadeOut}
          appear>
          <div
            className={`alert alert-success ${
              this.state.fadingOut ? "fade-exit fade-exit-active" : ""
            }`}>
            <i className="fas fa-check mr-2"></i>
            {children}
          </div>
        </CSSTransition>
      );
    else if (type === "error")
      return <div className="alert alert-danger fade">{children}</div>;
    else return <></>;
  }
}
