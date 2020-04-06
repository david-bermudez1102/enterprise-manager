import { handleErrors } from "./handleErrors";
import snakecaseKeys from "snakecase-keys";

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

export const fetchEmployees = adminId => {
  return dispatch => {
    fetch(`/api/v1/admins/${adminId}/employees`)
      .then(response => response.json())
      .then(employees => employees.data.map(employee => employee.attributes))
      .then(employees => dispatch({ type: "FETCH_EMPLOYEES", employees }));
  };
};

export const activate = (token, activation) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(`/api/v1/activations/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(snakecaseKeys({ activation }))
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(response => {
        if (!response.errors) {
          dispatch({
            type: "REMOVE_TOKEN"
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: response.messages
          });
          return "success";
        } else {
          dispatch({ type: "ADD_ERRORS", errors: response.errors });
        }
      })
      .catch(console.log);
  };
};
