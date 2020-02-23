import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AdminForm from "../components/AdminForm";

class AdminContainer extends Component {
  render() {
    const { organizations } = this.props;

    return (
      <div>
        {organizations.length === 0 ? <Redirect push to="/organizations/new" /> : ""}
        <AdminForm />
      </div>
    );
  }
}

/* const mapDispatchToProps = dispatch => {
  return {
    addOrganization: organization => dispatch(addOrganization(organization))
  };
}; */

export default connect()(AdminContainer);
