import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";
import { connect } from "react-redux";
import AlertShow from "./AlertShow";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.alerts !== this.props.alerts) {
      if (this.props.alerts.length > 0) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 5000);
      } else {
        this.setState({ show: false });
      }
    }
  }

  render() {
    const { alerts } = this.props;
    const error = alerts.find(alert => alert.type === "error");
    const success = alerts.find(alert => alert.type === "success");
    if (success)
      return (
        <CSSTransition
          in={this.state.show}
          timeout={300}
          unmountOnExit
          classNames="fade"
          appear>
          <AlertShow
            className="alert-danger"
            messages={success.messages}
            style={{ background: "rgba(0,0,0,0.8)" }}
            handleClose={() => this.setState({ show: false })}
          />
        </CSSTransition>
      );
    else if (error)
      return (
        <CSSTransition
          in={this.state.show}
          timeout={300}
          unmountOnExit
          classNames="fade"
          appear>
          <AlertShow
            className="alert-danger"
            messages={error.messages}
            style={{ background: "rgba(223, 53, 23, 0.8)" }}
            handleClose={() => this.setState({ show: false })}
          />
        </CSSTransition>
      );
    else return null;
  }
}

const mapStateToProps = ({ alerts }) => {
  return { alerts };
};

export default connect(mapStateToProps)(Alert);
