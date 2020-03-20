import React, { Component } from "react";
import ProfileForm from "../Accounts/ProfileForm";
import { connect } from "react-redux";
import { updateAdmin } from "../../actions/adminActions";

class AccountSettings extends Component {
  render() {
    const { session, updateAdmin } = this.props;
    const { currentUser } = session;
    return session.isLoggedIn ? (
      <div className="bg-white shadow-sm p-4 rounded">
        <span className="d-flex display-4 mb-0 align-items-start" style={{ fontSize: "40px" }}>
          {currentUser.name}
        </span>
        <hr />
        <ProfileForm currentUser={currentUser} updateAdmin={updateAdmin} />
      </div>
    ) : null;
  }
}

const mapStateToProps = ({ session }) => {
  return { session };
};
export default connect(mapStateToProps, { updateAdmin })(AccountSettings);
