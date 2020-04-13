import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import RecordsList from "../../components/Records/RecordsList";
import { fetchRecords } from "../../actions/recordActions";
import RecordFieldDelete from "../../components/Records/RecordFieldDelete";
import { removeRecordField } from "../../actions/recordFieldActions";
import { NoContent } from "../../components/NoContent";
import RecordsOptions from "../../components/Records/RecordsOptions";
import { ReactHeight } from "react-height";
import Pagination from "../../components/Pagination";

class RecordsContainer extends Component {
  state = { height: 0, optionsHeight: 0 };
  componentDidMount() {
    const { resource, fetchRecords } = this.props;
    fetchRecords(resource.organizationId, resource.id);
  }

  setListHeight = height => {
    this.setState({ height });
  };

  setOptionsHeight = optionsHeight => {
    this.setState({ optionsHeight });
  };

  render() {
    const {
      match,
      resource,
      recordFields,
      removeRecordField,
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
            <div
              className="col-lg-12 pt-4 d-block float-left position-relative"
              style={{
                height: `${this.state.height + this.state.optionsHeight + 50}px`
              }}>
              <div className="w-100 position-relative">
                <div className="bg-white shadow-sm p-2 d-inline-block rounded w-100 position-absolute table-responsive">
                  <ReactHeight
                    onHeightReady={height => this.setOptionsHeight(height)}>
                    <RecordsOptions resource={resource} />
                    <Pagination resource={resource} />
                  </ReactHeight>
                  {records.length > 0 ? (
                    <ReactHeight
                      onHeightReady={height => this.setListHeight(height)}>
                      <RecordsList
                        history={props.history}
                        match={match}
                        recordFields={recordFields}
                        resource={resource}
                        records={records}
                        values={values}
                      />
                    </ReactHeight>
                  ) : (
                    <NoContent>
                      This resource doesn't have any records yet.
                    </NoContent>
                  )}
                </div>
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
  removeRecordField
})(RecordsContainer);
