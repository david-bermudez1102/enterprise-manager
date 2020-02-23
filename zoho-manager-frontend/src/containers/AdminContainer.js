import React, { Component } from "react";
import AdminForm from "../components/AdminForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addAdmin } from "../actions/adminActions";

class AdminContainer extends Component {
  render() {
    const { organizations, admins } = this.props;

    return (
      <div>
        {organizations.length === 0 ? <Redirect push to="/organizations/new" /> : ""}
        {admins.length === 0 ? <AdminForm addAdmin={this.props.addAdmin}/> : ""}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAdmin: admin => dispatch(addAdmin(admin))
  };
};

export default connect(null, mapDispatchToProps)(AdminContainer);
