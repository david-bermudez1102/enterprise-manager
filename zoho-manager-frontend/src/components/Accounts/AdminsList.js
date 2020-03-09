import React, { Component } from "react";
import cuid from "cuid";

class AdminsList extends Component {
  render() {
    const { admins } = this.props;
    return admins.map(admin => (
      <div className="list-group-item" key={cuid()}>
        <i className="fas fa-user-cog" title="Admin"></i>
        {admin.name}
      </div>
    ));
  }
}
export default AdminsList;
