import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import RecordsList from "../../components/Records/RecordsList";
import { fetchRecords } from "../../actions/recordActions";

class RecordsContainer extends Component {

  componentDidMount() {
    const { resource } = this.props;
    this.props.fetchRecords(resource.organizationId, resource.id)
  }
  
  render() {
    const { match, resource, recordFields, records, values } = this.props
    return (
      <>
        <Link to={`${match.url}/records`}>View All Records</Link>
        <Switch>
          <Route
            path={`${match.path}/records`}
            render={props => (
              <RecordsList
                recordFields={recordFields}
                resource={resource}
                records={records}
                values={values}
              />
            )}
          />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ records, values, recordFields}) => {
  return { records, values, recordFields };
};

export default connect(mapStateToProps, {fetchRecords})(RecordsContainer);
