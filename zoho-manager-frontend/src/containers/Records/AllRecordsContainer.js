import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

class AllRecordsContainer extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}`} render={props => <div></div>} />
      </Switch>
    );
  }
}

export default AllRecordsContainer;
