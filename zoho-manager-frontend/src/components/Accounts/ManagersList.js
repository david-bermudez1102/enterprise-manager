import React, { Component } from "react";

class ManagersList extends Component {
  render() {
    const { managers } = this.props;
    return managers.map(manager => (
      <div className="list-group-item">
        <i className="fas fa-user-shield" title="Manager"></i>
        {manager.name}
      </div>
    ));
  }
}
export default ManagersList;
