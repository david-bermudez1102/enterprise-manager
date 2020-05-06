import { handleErrors, displayErrors } from "./handleErrors";
import snakecaseKeys from "snakecase-keys";

export const add = (dispatch, url, id, type, payload, ...actions) => {
  dispatch({ type: "CLEAR_ALERTS" });
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(snakecaseKeys(payload)),
  })
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      if (!response.errors) {
        actions.forEach(act => dispatch(act));
        return response.links.values;
      } else {
        dispatch({
          type: "ADD_ERRORS",
          messages: response.errors,
        });
        return;
      }
    })
    .then(values => dispatch({ type: "ADD_VALUES", values }))
    .catch(console.log);
};

export const remove = (dispatch, url, id, type, ...actions) => {
  dispatch({ type: "CLEAR_ALERTS" });
  dispatch({ type: "REQUESTING_DATA" });
  return fetch(url, {
    method: "DELETE",
  })
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      if (response.destroyed || response.archived) {
        dispatch({
          type: "ADD_MESSAGES",
          messages: response.messages,
        });
        return dispatch({
          type,
          id,
          status: "deleted",
        });
      } else {
        return dispatch({ type: "ADD_ERRORS", errors: response.errors });
      }
    })
    .then(() => actions.forEach(act => dispatch(act)))
    .then(() => dispatch({ type: "FINISHED_REQUESTING" }))
    .catch(resp => displayErrors(resp, dispatch));
};
