import React, { Component } from "react";
import cuid from "cuid";

class ManagersList extends Component {
  render() {
    const { managers } = this.props;
    return managers.map(manager => (
      <div className="list-group-item" key={cuid()}>
        <i className="fas fa-user-shield" title="Manager"></i>
        {manager.name}
      </div>
    ));
  }
}
export default ManagersList;
