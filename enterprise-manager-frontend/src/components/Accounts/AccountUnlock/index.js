import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateAccount } from "../../../actions/accountActions";
import { Redirect } from "react-router-dom";

const AccountUnlock = ({ account, updateAccount, url }) => {
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    if (account.locked) updateAccount({ id: account.id, locked: true }).then(() => setUpdated(true));
    else setUpdated(true);
  }, []);

  return updated ? <Redirect to={url} /> : null;
};

export default connect(null, { updateAccount })(AccountUnlock);
