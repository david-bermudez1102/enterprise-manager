import React, { Component } from "react";
import cuid from "cuid";
import Account from "./Account";

class ManagersList extends Component {
  render() {
    const { managers } = this.props;
    return managers.map(manager => <Account key={cuid()} account={manager} />);
  }
}
export default ManagersList;
