import React, { Component } from "react";
import { Route, Switch, matchPath } from "react-router-dom";
import RecordsResourcesList from "../../components/Records/RecordsPerResource/RecordsResourcesList";
import RecordsList from "../../components/Records/RecordsList";
import { connect } from "react-redux";
import { fetchRecords } from "../../actions/recordActions";
import {
  removeRecordField,
  fetchRecordFields
} from "../../actions/recordFieldActions";

class AllRecordsContainer extends Component {
  constructor(props) {
    super(props);
    const currentParams = matchPath(props.location.pathname, {
      path: `/organizations/:organizationId/records/:resourceId`
    });
    this.state = {
      resourceId: currentParams ? currentParams.params.resourceId : null
    };
  }

  componentDidMount() {
    this.handleFetch(this.state.resourceId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const currentParams = matchPath(this.props.location.pathname, {
        path: `/organizations/:organizationId/records/:resourceId`
      });
      const resourceId = currentParams ? currentParams.params.resourceId : null;
      if (this.state.resourceId !== resourceId) this.handleFetch(resourceId);
    }
  }

  handleFetch = resourceId => {
    const { match, fetchRecords, fetchRecordFields } = this.props;
    if (resourceId) {
      console.log("Hey");
      fetchRecords(match.params.organizationId, parseInt(resourceId));
      fetchRecordFields(match.params.organizationId, parseInt(resourceId));
    }
  };

  render() {
    const { match, resources, values } = this.props;
    return (
      <Switch>
        {resources.length && values.length > 0 ? (
          <Route
            path={`${match.path}/:resourceId`}
            render={props => (
              <RecordsList
                {...this.props}
                resource={resources.find(
                  resource =>
                    resource.id === parseInt(props.match.params.resourceId)
                )}
              />
            )}
          />
        ) : null}
        <Route
          path={`${match.path}`}
          render={() => <RecordsResourcesList {...this.props} />}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ records, values, recordFields, session }) => {
  return { records, values, recordFields, session };
};

export default connect(mapStateToProps, {
  fetchRecords,
  removeRecordField,
  fetchRecordFields
})(AllRecordsContainer);
