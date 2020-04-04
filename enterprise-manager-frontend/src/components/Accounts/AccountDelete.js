import { useEffect } from "react";

const AccountDelete = ({ match, accounts, removeAccount, history }) => {
  useEffect(() => {
    const type = accounts
      .find(acc => acc.id === parseInt(match.params.accountId))
      .type.toUpperCase();
    removeAccount(match.params.accountId, `REMOVE_${type}`).then(action =>
      history.replace("/accounts")
    );
  }, [match, removeAccount, accounts, history]);

  return null;
};

export default AccountDelete;
