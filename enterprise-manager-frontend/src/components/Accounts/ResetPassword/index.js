import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { verifyToken } from "../../../actions/activationActions";
import ResetForm from "./ResetForm";
import PasswordChange from "./PasswordChange";
import Alert from "../../Alerts/Alert";

const ResetPassword = ({ verifyToken }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const [validToken, setValidToken] = useState(false);

  if (token) {
    verifyToken(token).then(resp =>
      resp === "success" ? setValidToken(true) : setValidToken(false)
    );
  }

  return (
    <div className="row d-flex h-100 align-items-center justify-content-center">
      <div className="col-xl-5 col-lg-6 col-md-6 px-0">
        <Alert />
        {validToken ? <PasswordChange /> : <ResetForm />}
      </div>
    </div>
  );
};

export default connect(null, { verifyToken })(ResetPassword);
