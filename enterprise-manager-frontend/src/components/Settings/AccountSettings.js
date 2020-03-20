import React, { Component } from "react";
import ProfileForm from "../Accounts/ProfileForm";
import { connect } from "react-redux";
import Avatar from "../Home/SideBar/Avatar";
import AvatarUploader from "../Uploader/AvatarUploader";
import FileUploader from "../Uploader/FileUploader";

class AccountSettings extends Component {
  render() {
    const { session } = this.props;
    const { currentUser } = session;
    return session.isLoggedIn ? (
      <div className="bg-white shadow-sm p-4 rounded">
        <span className="d-flex display-4 mb-0 align-items-start" style={{ fontSize: "40px" }}>
          <Avatar currentUser={currentUser} size="150px" />
          {currentUser.name}
        </span>
        <hr />
        <FileUploader className="circular--landscape shadow bg-light" size="150px">
          <AvatarUploader />
        </FileUploader>
        <ProfileForm currentUser={currentUser} />
      </div>
    ) : null;
  }
}

const mapStateToProps = ({ session }) => {
  return { session };
};
export default connect(mapStateToProps)(AccountSettings);
