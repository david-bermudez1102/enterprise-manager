import React, { Component } from "react";
import ProfileForm from "../Accounts/ProfileForm";
import { connect } from "react-redux";
import { updateAdmin } from "../../actions/adminActions";
import Alert from "../Alerts/Alert";

class AccountSettings extends Component {
  render() {
    const { session, alerts, updateAdmin } = this.props;
    const { currentUser } = session;
    return session.isLoggedIn ? (
      <div className="bg-white shadow-sm p-4 rounded">
        <Alert alerts={alerts} />
        <ProfileForm currentUser={currentUser} updateAdmin={updateAdmin} />
      </div>
    ) : null;
  }
}

const mapStateToProps = ({ session, alerts }) => {
  return { session, alerts };
};
export default connect(mapStateToProps, { updateAdmin })(AccountSettings);
