import { handleErrors } from './handleErrors';
const camelcaseKeys = require('camelcase-keys');

export const addSession = data => {
  return dispatch => {
    dispatch({ type: 'CLEAR_ERRORS' });
    const configObj = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/v1/sessions', configObj)
      .then(handleErrors)
      .then(response => response.json())
      .then(account =>
        !account.errors
          ? dispatch({
              type: 'ADD_SESSION',
              isLoggedIn: true,
              currentUser: camelcaseKeys(account.data.attributes)
            })
          : dispatch({
              type: 'ADD_ERRORS',
              errors: account.errors
            })
      )
      .catch(console.log);
  };
};

export const fetchSession = () => {
  return dispatch => {
    fetch('/api/v1/current_user', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(account =>
        !account.errors
          ? dispatch({
              type: 'ADD_SESSION',
              isLoggedIn: true,
              currentUser: camelcaseKeys(account.data.attributes)
            })
          : null
      )
      .catch(console.log);
  };
};

export const removeSession = () => {
  return dispatch => {
    fetch('api/v1/delete_session', {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data =>
        !data.error
          ? dispatch({
              type: 'REMOVE_SESSION'
            })
          : null
      )
      .catch(console.log);
  };
};
