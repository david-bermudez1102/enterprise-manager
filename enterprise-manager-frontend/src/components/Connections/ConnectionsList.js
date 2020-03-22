import React, { Component } from "react";
import cuid from "cuid";

class ConnectionsList extends Component {
  render() {
    const { resource } = this.props;
    const connections = [
      resource.zohoConnection,
      resource.quickbooksConnection
    ].filter(connection => connection);
    return (
      <div className={`list-group list-group-flush rounded`}>
        {connections.map(connection => (
          <div key={cuid()} className={`list-group-item`}>
            {connection.name}
            Connected to: {connection.connection_type}
            through: {connection.connected_through}
          </div>
        ))}
      </div>
    );
  }
}

export default ConnectionsList;
