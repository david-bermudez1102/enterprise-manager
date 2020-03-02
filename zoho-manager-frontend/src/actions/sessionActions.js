const camelcaseKeys = require("camelcase-keys");

export const addSession = data => {
  return dispatch => {
    const configObj = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("/api/v1/sessions", configObj)
      .then(response => response.json())
      .then(account =>
        !account.error
          ? dispatch({
              type: "ADD_SESSION",
              isLoggedIn: true,
              currentUser: camelcaseKeys(account.data.attributes)
            })
          : dispatch({
              type: "ADD_SESSION",
              isLoggedIn: false,
              currentUser: {}
            })
      );
  };
};

export const fetchSession = () => {
  return dispatch => {
    fetch("/api/v1/current_user", {
      credentials: "include"
    })
      .then(response => response.json())
      .then(account =>
        !account.error
          ? dispatch({
              type: "ADD_SESSION",
              isLoggedIn: true,
              currentUser: camelcaseKeys(account.data.attributes)
            })
          : dispatch({
              type: "ADD_SESSION",
              isLoggedIn: false,
              currentUser: {}
            })
      );
  };
};

export const removeSession = () => {
  return dispatch => {
    fetch("api/v1/delete_session", {
      method: "DELETE",
      credentials: "include"
    })
      .then(response => response.json())
      .then(data =>
        !data.error
          ? dispatch({
              type: "REMOVE_SESSION"
            })
          : null
      );
  };
};
