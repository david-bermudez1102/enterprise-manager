import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import RecordsList from "../../components/Records/RecordsList";
import { fetchRecords } from "../../actions/recordActions";
import RecordFieldDelete from "../../components/Records/RecordFieldDelete";
import { removeRecordField } from "../../actions/recordFieldActions";
import { NoContent } from "../../components/NoContent";
import RecordsOptions from "../../components/Records/RecordsOptions";
import ReactHeight from "react-height";

class RecordsContainer extends Component {
  state = { height: 0, optionsHeight: 0, requesting: true };

  componentDidMount() {
    const { records, resource, fetchRecords } = this.props;
    const lastRecord = Math.max(
      ...records.filter(record => record.formId === resource.id).map(r => r.id),
      0
    ); // return the most recent record,

    fetchRecords(resource.organizationId, resource.id, lastRecord);
  }

  componentDidUpdate(prevProps) {
    const { resource, fetchRecords } = this.props;
    if (prevProps.resource !== resource)
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
      sortedRecords,
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
                <div className="bg-white shadow-sm p-2 d-inline-block rounded w-100 position-absolute">
                  <ReactHeight
                    onHeightReady={height => this.setOptionsHeight(height)}>
                    <RecordsOptions resource={resource} />
                  </ReactHeight>
                  {records.filter(record => record.formId === resource.id)
                    .length > 0 ? (
                    <ReactHeight
                      onHeightReady={height => this.setListHeight(height)}>
                      <RecordsList
                        recordFields={recordFields.filter(
                          f => f.formId === resource.id
                        )}
                        resource={resource}
                        records={records.filter(
                          record => record.formId === resource.id
                        )}
                        sortedRecords={sortedRecords.filter(
                          r => r.formId === resource.id
                        )}
                        values={values.filter(
                          value => value.formId === resource.id
                        )}
                      />
                    </ReactHeight>
                  ) : (
                    <ReactHeight
                      onHeightReady={height => this.setListHeight(height)}>
                      <NoContent>
                        This resource doesn't have any records yet.
                      </NoContent>
                    </ReactHeight>
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

const mapStateToProps = ({
  records,
  values,
  recordFields,
  pagination,
  sortedRecords
}) => {
  return { records, values, recordFields, pagination, sortedRecords };
};

export default connect(mapStateToProps, {
  fetchRecords,
  removeRecordField
})(RecordsContainer);
