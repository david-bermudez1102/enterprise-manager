import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import RecordsList from "../../components/Records/RecordsList";
import { fetchRecords } from "../../actions/recordActions";
import { fetchValues } from "../../actions/valueActions";

class RecordsContainer extends Component {
  state = { records:[], values:[], fields:[] }

  componentDidMount() {
    const { resource } = this.props;
    this.props.fetchRecords(resource.organizationId, resource.id)
    this.props.fetchValues(resource.organizationId, resource.id);
  }
  
  render() {
    const { match, resource, fields } = this.props
    return (
      <>
        <Link to={`${match.url}/records`}>View All Records</Link>
        <Switch>
          <Route
            path={`${match.path}/records`}
            render={props => (
              <RecordsList
                fields={fields}
                resource={resource}
                records={this.props.records}
                values={this.props.values}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    records: state.records,
    values: state.values,
    fields: state.fields
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecords: (organizationId, formId) =>
      dispatch(fetchRecords(organizationId, formId)),
    fetchValues: (organizationId, formId) =>
      dispatch(fetchValues(organizationId, formId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordsContainer);