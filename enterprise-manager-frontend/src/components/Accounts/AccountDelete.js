import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class AccountDelete extends Component {
  constructor() {
    super();
    this.state = { status: "deleting" };
  }

  componentDidMount() {
    const { match, type, removeAccount } = this.props;
    removeAccount(match.params.accountId, type).then(action =>
      this.setState({ status: action ? action.status : "deleted" })
    );
  }

  render() {
    const { redirectTo } = this.props;
    return this.state.status === "deleted" ? (
      <Redirect to={redirectTo} />
    ) : null;
  }
}
