import React, { Component } from "react";
import cuid from "cuid";
import Account from "./Account";

class AdminsList extends Component {
  render() {
    const { admins } = this.props;
    console.log(admins);
    return admins.map(admin => <Account key={cuid()} account={admin} />);
  }
}
export default AdminsList;
