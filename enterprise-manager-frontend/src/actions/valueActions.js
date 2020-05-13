import snakecaseKeys from "snakecase-keys";
import { handleErrors, displayErrors } from "./handleErrors";
import { add } from "./fetchActions";

export const fetchValues = (organizationId, formId) => {
  return dispatch => {
    fetch(`/api/v1/organizations/${organizationId}/forms/${formId}/values`, {
      credentials: "include",
    })
      .then(response => response.json())
      .then(values => dispatch({ type: "FETCH_VALUES", values }));
  };
};

export const setSortedValues = (values, formId) => {
  return dispatch => dispatch({ type: "SET_SORTED_VALUES", values, formId });
};

export const addValue = value => {
  return dispatch =>
    add(
      dispatch,
      `/api/v1/organizations/${value.organizationId}/forms/${value.formId}/values`,
      { value },
      { type: "ADD_VALUE", value }
    );
};

export const updateValue = value => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(
      `/api/v1/organizations/${value.organizationId}/forms/${value.formId}/values/${value.id}`,
      {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snakecaseKeys({ value })),
      }
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(value => {
        if (!value.errors) {
          dispatch({
            type: "UPDATE_VALUE",
            value,
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: value.messages || ["Changes saved successfully."],
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: value.errors });
        }
      })
      .catch(resp => displayErrors(resp, dispatch));
  };
};
