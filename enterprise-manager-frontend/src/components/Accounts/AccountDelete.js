import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class AccountDelete extends Component {
  constructor() {
    super();
    this.state = { status: "deleting" };
  }

  componentDidMount() {
    const { match, accounts, removeAccount } = this.props;
    console.log(accounts);
    const type = accounts
      .find(acc => acc.id === parseInt(match.params.accountId))
      .type.toUpperCase();
    removeAccount(match.params.accountId, `REMOVE_${type}`).then(action =>
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

export default AccountDelete;
