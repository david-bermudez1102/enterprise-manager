export const addAccount = account => {
  return dispatch => {
    fetch("/api/v1/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(account)
    })
      .then(response => response.json())
      .then(account => account.data.attributes)
      .then(account => dispatch({ type: "ADD_ACCOUNT", account }));
  };
};

export const fetchAccounts = organizationId => {
  return dispatch => {
    fetch("/api/v1/accounts")
      .then(response => response.json())
      .then(accounts => accounts.data.map(account => account.attributes))
      .then(accounts => dispatch({ type: "ADD_ACCOUNTS", accounts }));
  };
};
