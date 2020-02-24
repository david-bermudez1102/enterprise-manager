import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class LogoutContainer extends Component {
  componentDidMount() {
    fetch("http://localhost:3001/delete_session", {
      method: "DELETE",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data =>
        data.message === "success" ? this.props.handleLogout() : null
      );
  }

  render() {
    return <Redirect push to="/" />;
  }
}
