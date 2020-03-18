import React, { Component } from 'react';
import Alert from '../Alerts/Alert';

const snakeCaseKeys = require('snakecase-keys');

export default class ConnectionsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      resourceId: props.resourceId,
      integrationId: props.integrationId,
      organizationId: props.organizationId,
      name: '',
      connectionType: ''
    };
  }

  componentDidMount() {
    const { connection } = this.props;
    return connection ? this.updateState() : null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resource !== this.props.resource) {
      const { connection } = this.props;
      return connection ? this.updateState() : null;
    }
  }

  updateState = () => {
    const { connection, organizationId } = this.props;
    this.setState({
      resourceId: connection.form_id,
      integrationId: connection.integration_id,
      organizationId: organizationId,
      name: connection.name,
      connectionType: connection.connection_type
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      integrationId,
      type,
      resourceId,
      organizationId,
      name,
      connectionType
    } = this.state;
    this.props.updateResource(
      snakeCaseKeys({
        [type]: {
          integrationId,
          name,
          connectionType,
          formId: resourceId
        }
      }),
      organizationId,
      resourceId
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Alert />
        <div className="form-group">
          <label htmlFor="connection_name">
            Enter a name for this connection:
          </label>
          <input
            type="text"
            name="name"
            id="connection_name"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Enter name..."
          />
          <label htmlFor="connection_connectionType">
            Connect this resource to:
          </label>
          <select
            name="connectionType"
            id="connection_connectionType"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.connectionType}>
            <option value="select">Select</option>
            <option value="contacts">Contacts</option>
            <option value="items">Items</option>
            <option value="invoices">Invoices</option>
          </select>
        </div>
        <input
          type="submit"
          className="btn btn-primary shadow"
          value="Update Connection"
        />
      </form>
    );
  }
}
