import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class AccountDelete extends Component {
  componentDidMount() {
    const { match, accounts, removeAccount, history } = this.props;
    const type = accounts
      .find(acc => acc.id === parseInt(match.params.accountId))
      .type.toUpperCase();
    removeAccount(match.params.accountId, `REMOVE_${type}`).then(action =>
      history.replace("/accounts")
    );
  }

  render() {
    return null;
  }
}

export default AccountDelete;
