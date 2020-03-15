import React, { Component } from "react";
import AdminForm from "../components/AdminForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addAdmin } from "../actions/adminActions";
import { FormCard } from "../components/Cards/Cards";

class AdminContainer extends Component {
  render() {
    const { organizations, admins } = this.props;

    return (
      <>
        {organizations.length === 0 ? (
          <Redirect push to="/organizations/new" />
        ) : null}
        {admins.length === 0 ? (
          <div className="row d-flex h-100 align-items-center justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-6 px-0">
              <FormCard
                header={
                  <span
                    className="card-title display-4 mb-0"
                    style={{ fontSize: "32px" }}>
                    Create First Admin
                  </span>
                }>
                <AdminForm addAdmin={this.props.addAdmin} />
              </FormCard>
            </div>
          </div>
        ) : (
          <Redirect push to="/login" />
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAdmin: admin => dispatch(addAdmin(admin))
  };
};

export default connect(null, mapDispatchToProps)(AdminContainer);
