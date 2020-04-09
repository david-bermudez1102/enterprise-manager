import { useEffect } from "react";

const AccountDelete = ({ match, accounts, removeAccount, history }) => {
  useEffect(() => {
    removeAccount(match.params.accountId).then(() => history.replace("/accounts"));
  }, [match, removeAccount, accounts, history]);

  return null;
};

export default AccountDelete;
