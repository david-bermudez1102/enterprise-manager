import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import RecordsList from "../../components/Records/RecordsList";
import { fetchRecords } from "../../actions/recordActions";

class RecordsContainer extends Component {
  state = { records:[], values:[] }

  componentDidMount() {
    const { resource } = this.props;
    this.props.fetchRecords(resource.organizationId, resource.id)
  }

  render() {
    const { match, resource } = this.props
    return (
      <>
        <Link to={`${match.url}/records`}>View All Records</Link>
        <Switch>
          <Route
            path={`${match.path}/records`}
            render={props => (
              <RecordsList
                resourceId={resource.id}
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
    records: state.records
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecords: (organizationId, formId) =>
      dispatch(fetchRecords(organizationId, formId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordsContainer);
