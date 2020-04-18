import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateAccount } from "../../../actions/accountActions";
import { Redirect } from "react-router-dom";

const AccountDisable = ({ account, updateAccount, url }) => {
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    updateAccount({ id: account.id, disabled: !account.disabled }).then(() =>
      setUpdated(true)
    );
  }, []);

  return updated ? <Redirect to={url} /> : null;
};

export default connect(null, { updateAccount })(AccountDisable);
