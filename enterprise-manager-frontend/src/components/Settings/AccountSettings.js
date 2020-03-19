import React, { Component } from "react";
import ProfileForm from "../Accounts/ProfileForm";
import { connect } from "react-redux";
import Avatar from "../Home/SideBar/Avatar";
import Uploader from "../Uploader/Uploader";

class AccountSettings extends Component {
  render() {
    const { session } = this.props;
    const { currentUser } = session;
    return session.isLoggedIn ? (
      <div className="bg-white shadow-sm p-4 rounded">
        <span className="d-flex display-4 mb-0 align-items-start" style={{ fontSize: "40px" }}>
          <Avatar currentUser={currentUser} width="150px" />
          {currentUser.name}
        </span>
        <hr />
        <Uploader />
        <ProfileForm currentUser={currentUser} />
      </div>
    ) : null;
  }
}

const mapStateToProps = ({ session }) => {
  return { session };
};
export default connect(mapStateToProps)(AccountSettings);
