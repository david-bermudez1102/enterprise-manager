import { handleErrors } from "./handleErrors";

export const verifyToken = token => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(`/api/v1/activations/${token}`)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(resp => {
        if (resp.message) {
          dispatch({ type: "ADD_TOKEN", token, name: resp.name });
          return resp.message;
        } else dispatch({ type: "ADD_ERRORS", errors: resp.errors });
      })
      .catch(console.log);
  };
};
