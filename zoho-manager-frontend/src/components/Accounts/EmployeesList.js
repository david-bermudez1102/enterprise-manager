import React, { Component } from "react";

class EmployeesList extends Component {
  render() {
    const { employees } = this.props;
    return employees.map(employee => (
      <div className="list-group-item">
        <i className="fas fa-user" title="Employee"></i>
        {employee.name}
      </div>
    ));
  }
}
export default EmployeesList;
