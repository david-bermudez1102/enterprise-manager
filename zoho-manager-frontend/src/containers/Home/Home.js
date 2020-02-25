import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchResources } from "../../actions/resourceActions";

class Home extends Component {
  state = { resources: [] };

  componentDidMount() {
    const { organization, fetchResources } = this.props;
    fetchResources(organization.id);
  }

  render() {
    return (
      <div>
        
      </div>
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
