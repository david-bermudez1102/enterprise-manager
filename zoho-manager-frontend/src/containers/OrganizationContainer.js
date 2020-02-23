import React, { Component } from "react";
import OrganizationInput from "../components/OrganizationInput";
import { connect } from "react-redux";
import { addOrganization } from "../actions/OrganizationAction"

class OrganizationContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <OrganizationInput addOrganization={this.props.addOrganization}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { addOrganization: organization => dispatch(addOrganization(organization))}
}

export default connect(null, mapDispatchToProps)(OrganizationContainer);