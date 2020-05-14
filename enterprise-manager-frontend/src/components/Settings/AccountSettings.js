import React from "react";
import ProfileForm from "../Accounts/ProfileForm";
import { connect } from "react-redux";
import { updateAdmin } from "../../actions/adminActions";
import { Card } from "antd";

const AccountSettings = props => {
  const { session, updateAdmin } = props;
  const { currentUser } = session;
  return (
    <Card>
      <ProfileForm currentUser={currentUser} updateAdmin={updateAdmin} />
    </Card>
  );
};

const mapStateToProps = ({ session }) => ({ session });

export default connect(mapStateToProps, { updateAdmin })(AccountSettings);
