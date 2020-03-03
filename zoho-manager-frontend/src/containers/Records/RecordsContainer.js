import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import RecordsList from "../../components/Records/RecordsList";
import { fetchRecords } from "../../actions/recordActions";

const pluralize = require("pluralize");

class RecordsContainer extends Component {
  componentDidMount() {
    const { resource, fetchRecords } = this.props;
    fetchRecords(resource.organizationId, resource.id)
  }

  render() {
    const { match, resource, recordFields, records, values } = this.props;
    return (
      <div className="col-lg-12 bg-white rounded shadow">
        <Link to={`${match.url}/records`}>
          View All {pluralize(resource.name)}
        </Link>
        <Switch>
          <Route
            path={`${match.path}/records`}
            render={props => (
              <RecordsList
                match={match}
                recordFields={recordFields}
                resource={resource}
                records={records}
                values={values}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ records, values, recordFields }) => {
  return { records, values, recordFields };
};

export default connect(mapStateToProps, { fetchRecords })(RecordsContainer);
