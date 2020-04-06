import React from "react";
import { FormCard } from "../../Cards/Cards";

const ResetContainer = () => {
  return (
    <FormCard header={<span className="display-4">Reset Password</span>}>
      <ResetForm />
    </FormCard>
  );
};

export default ResetContainer;
