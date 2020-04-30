import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  addZohoResources,
  updateAllContacts
} from "../../actions/zohoBooksActions";

class RecordsOptions extends PureComponent {
  render() {
    const { addZohoResources, updateAllContacts, resource } = this.props;
    if (!resource.zohoConnection) return null;
    const connectionType = resource.zohoConnection.connection_type;
    return (
      <div className="pb-2 d-flex sticky-top w-100 bg-white">
        <button className="btn btn-sm btn-info m-2 shadow">
          <i className="fas fa-sync mr-2"></i>Synchronize {connectionType} with
          Zoho
        </button>
        <button
          className="btn btn-sm btn-info m-2 shadow"
          onClick={() =>
            addZohoResources(
              {
                form_id: resource.id,
                organization_id: resource.organizationId
              },
              connectionType
            )
          }>
          <i className="far fa-share-square mr-2"></i>
          Send Unsynchronized {connectionType} to Zoho
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
          <i className="far fa-edit mr-2"></i>
          Update all {resource.zohoConnection.connection_type} to Zoho
        </button>
      </div>
    );
  }
}

export default connect(null, { addZohoResources, updateAllContacts })(
  RecordsOptions
);
