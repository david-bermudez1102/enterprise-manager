import React from "react";
import { FormCard } from "../../Cards/Cards";
import PasswordChangeForm from "./PasswordChangeForm";
import { useSelector } from "react-redux";

const PasswordChange = () => {
  const { name, token } = useSelector(state => state.token);
  return (
    <FormCard header={<span className="display-4">Create a new password</span>}>
      <h4>Hey {name}, let's create a new password.</h4>
      <PasswordChangeForm token={token} />
    </FormCard>
  );
};

export default PasswordChange;
