import React from "react";
import { FormCard } from "../../Cards/Cards";
import PasswordChangeForm from "./PasswordChangeForm";
import { useSelector, connect } from "react-redux";
import { activate } from "../../../actions/activationActions";
import { useHistory } from "react-router-dom";

const PasswordChange = ({ activate }) => {
  const { name, token } = useSelector(state => state.token);
  const history = useHistory();
  return (
    <FormCard header={<span className="display-4">Create a new password</span>}>
      <h4>Hey {name}, let's create a new password.</h4>
      <PasswordChangeForm
        token={token}
        handleSubmit={activate}
        history={history}
      />
    </FormCard>
  );
};

export default connect(null, { activate })(PasswordChange);
