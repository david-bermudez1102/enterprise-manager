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
        {organizations.length === 0 ? <Redirect push to="/organizations/new" /> : null}
        {admins.length === 0 ? (
          <div className="row d-flex h-100 align-items-center justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-6 px-0">
              <FormCard
                header={
                  <span className="card-title mb-0 text-white">
                    <h2>
                      <i className="fas fa-user-shield mr-2"></i>Create Root Admin
                    </h2>
                  </span>
                }>
                <AdminForm addAdmin={this.props.addAdmin} organizationId={organizations[0].id} />
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
