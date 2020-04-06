import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { verifyToken } from "../../../actions/activationActions";
import ResetPasswordForm from "./ResetPasswordForm";

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
  return validToken ? <ResetPasswordForm /> : null;
};

export default connect(null, { verifyToken })(ResetPassword);
