import { handleErrors, displayErrors } from "./handleErrors";

export const remove = (dispatch, url, id, type, ...actions) => {
  dispatch({ type: "CLEAR_ALERTS" });
  return fetch(url, {
    method: "DELETE",
  })
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      if (response.destroyed || response.archived) {
        dispatch({
          type,
          id,
          status: "deleted",
        });
        actions.forEach(act => dispatch(act));
        dispatch({
          type: "ADD_MESSAGES",
          messages: response.messages,
        });
      } else {
        dispatch({ type: "ADD_ERRORS", errors: response.errors });
      }
      return response;
    })
    .catch(resp => displayErrors(resp, dispatch));
};
