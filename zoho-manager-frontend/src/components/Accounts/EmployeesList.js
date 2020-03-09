import React, { Component } from "react";
import cuid from "cuid";
import Account from "./Account";

class EmployeesList extends Component {
  render() {
    const { employees } = this.props;
    return employees.map(employee => (
      <Account key={cuid()} account={employee} />
    ));
  }
}
export default EmployeesList;
