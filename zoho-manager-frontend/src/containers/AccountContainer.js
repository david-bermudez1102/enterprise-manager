import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AccountForm from "../components/AccountForm";

class AccountContainer extends Component {
  render() {
    const { organizations } = this.props;

    return (
      <div>
        {organizations.length === 0 ? <Redirect to="/organizations/new" /> : ""}
        <AccountForm />
      </div>
    );
  }
}

/* const mapDispatchToProps = dispatch => {
  return {
    addOrganization: organization => dispatch(addOrganization(organization))
  };
}; */

export default connect()(AccountContainer);
