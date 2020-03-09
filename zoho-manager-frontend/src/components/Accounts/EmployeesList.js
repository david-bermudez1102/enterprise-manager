import React, { Component } from "react";
import cuid from "cuid";

class EmployeesList extends Component {
  render() {
    const { employees } = this.props;
    return employees.map(employee => (
      <div className="list-group-item" key={cuid()}>
        <i className="fas fa-user" title="Employee"></i>
        {employee.name}
      </div>
    ));
  }
}
export default EmployeesList;
