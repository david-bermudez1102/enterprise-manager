import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import RecordsList from "../../components/Records/RecordsList";
import { fetchRecords } from "../../actions/recordActions";
import RecordFieldDelete from "../../components/Records/RecordFieldDelete";
import { removeRecordField } from "../../actions/recordFieldActions";
import { NoContent } from "../../components/NoContent";
import {
  addContacts,
  updateContact,
  updateAllContacts
} from "../../actions/zohoBooksActions";

class RecordsContainer extends Component {
  componentDidMount() {
    const { resource, fetchRecords } = this.props;
    fetchRecords(resource.organizationId, resource.id);
  }

  render() {
    const {
      match,
      resource,
      recordFields,
      removeRecordField,
      addContacts,
      updateContact,
      updateAllContacts,
      records,
      values
    } = this.props;
    return (
      <Switch>
        <Route
          path={`${match.path}/record_fields/:recordFieldId/delete`}
          render={props => (
            <RecordFieldDelete
              {...props}
              redirectTo={`${match.url}/records`}
              organizationId={resource.organizationId}
              resourceId={resource.id}
              removeRecordField={removeRecordField}
            />
          )}
        />
        <Route
          path={`${match.path}/records`}
          render={props => (
            <div className="col-lg-12 pt-3">
              <div className="bg-white shadow-sm">
                <button className="btn btn-info m-2">
                  Synchronize with Zoho
                </button>
                <button
                  className="btn btn-info m-2"
                  onClick={() =>
                    addContacts({
                      form_id: resource.id,
                      organization_id: resource.organizationId
                    })
                  }>
                  Send Unsynchronized records to Zoho
                </button>
                <button
                  className="btn btn-info m-2"
                  onClick={() =>
                    updateAllContacts({
                      record_id: 174,
                      form_id: 6,
                      organization_id: 1
                    })
                  }>
                  Update all records to Zoho
                </button>
                {records.length > 0 ? (
                  <RecordsList
                    history={props.history}
                    match={match}
                    recordFields={recordFields}
                    resource={resource}
                    records={records}
                    values={values}
                  />
                ) : (
                  <NoContent>
                    This resource doesn't have any records yet.
                  </NoContent>
                )}
              </div>
            </div>
          )}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ records, values, recordFields }) => {
  return { records, values, recordFields };
};

export default connect(mapStateToProps, {
  fetchRecords,
  removeRecordField,
  addContacts,
  updateContact,
  updateAllContacts
})(RecordsContainer);
