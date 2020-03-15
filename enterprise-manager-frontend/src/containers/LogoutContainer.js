import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class LogoutContainer extends Component {
  componentDidMount() {
    this.props.removeSession()
  }

  render() {
    return <Redirect push to="/" />;
  }
}
