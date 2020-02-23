import jsonToFormData from "json-form-data";

export const addAccount = account => {
  return dispatch => {
    fetch("/accounts", {
      method: "POST",
      body: jsonToFormData(account)
    })
      .then(response => response.json())
      .then(account => account.data.attributes)
      .then(account =>
        dispatch({ type: "ADD_ACCOUNT", account })
      );
  };
};

export const fetchAccounts = () => {
  return dispatch => {
    fetch("/accounts")
      .then(response => response.json())
      .then(accounts =>
        accounts.data.map(account => account.attributes)
      )
      .then(accounts =>
        dispatch({ type: "ADD_ACCOUNTS", accounts })
      );
  };
};
