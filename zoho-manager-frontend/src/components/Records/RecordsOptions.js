import React, { Component } from "react";
import { connect } from "react-redux";
import { addContacts, updateAllContacts } from "../../actions/zohoBooksActions";

class RecordsOptions extends Component {
  constructor() {
    super();
  }

  render() {
    const { addContacts, updateAllContacts, resource } = this.props;
    if (!resource.zohoConnection) return null;
    return (
      <div className="pb-2 d-flex sticky-top w-100 bg-white">
        <button className="btn btn-sm btn-info m-2 shadow">
          Synchronize {resource.zohoConnection.connection_type} with Zoho
        </button>
        <button
          className="btn btn-sm btn-info m-2 shadow"
          onClick={() =>
            addContacts({
              form_id: resource.id,
              organization_id: resource.organizationId
            })
          }>
          Send Unsynchronized {resource.zohoConnection.connection_type} to Zoho
        </button>
        <button
          className="btn btn-sm btn-info m-2 shadow"
          onClick={() =>
            updateAllContacts({
              record_id: 174,
              form_id: 6,
              organization_id: 1
            })
          }>
          Update all {resource.zohoConnection.connection_type} to Zoho
        </button>
      </div>
    );
  }
}

export default connect(null, { addContacts, updateAllContacts })(
  RecordsOptions
);
