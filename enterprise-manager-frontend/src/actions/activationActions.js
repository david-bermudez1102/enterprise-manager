import { handleErrors } from "./handleErrors";

export const verifyToken = token => {
  return dispatch => {
    return fetch(`/api/v1/activations/${token}`)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(resp =>
        resp.message
          ? "success"
          : dispatch({ type: "ADD_ERRORS", errors: resp.errors })
      )
      .catch(console.log);
  };
};
