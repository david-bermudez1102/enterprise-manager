import React, { Component } from "react";
import OrganizationInput from "../components/OrganizationInput";
import { connect } from "react-redux";
import { addOrganization } from "../actions/organizationAction";
import { Redirect } from "react-router-dom";

class OrganizationContainer extends Component {
  render() {
    const { organizations } = this.props;

    return (
      <div>
        {organizations.length > 0 ? <Redirect push to="/accounts/new" /> : ""}
        <OrganizationInput addOrganization={this.props.addOrganization} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrganization: organization => dispatch(addOrganization(organization))
  };
};

export default connect(null, mapDispatchToProps)(OrganizationContainer);
