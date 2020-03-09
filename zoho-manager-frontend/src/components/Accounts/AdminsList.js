import React, { Component } from "react";

class AdminsList extends Component {
  render() {
    const { admins } = this.props;
    return admins.map(admin => (
      <div className="list-group-item">
        <i className="fas fa-user-cog" title="Admin"></i>
        {admin.name}
      </div>
    ));
  }
}
export default AdminsList;
