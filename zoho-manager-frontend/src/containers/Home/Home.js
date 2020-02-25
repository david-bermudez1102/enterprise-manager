import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResources } from "../../actions/resourceActions";
import { Route } from "react-router-dom";
import ResourcesContainer from "../ResourceCreator/ResourcesContainer";

class Home extends Component {
  state = { resources: [] };

  componentDidMount() {
    const { organization, fetchResources } = this.props;
    fetchResources(organization.id);
  }

  render() {
    return (
      <>
      <Route path="/resources" render={ props => <ResourcesContainer {...props}/>}/>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    resources: state.resources
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchResources: organizationId => dispatch(fetchResources(organizationId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
