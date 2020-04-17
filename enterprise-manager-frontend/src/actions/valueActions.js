import snakecaseKeys from "snakecase-keys";
const camelcaseKeys = require("camelcase-keys");

export const fetchValues = (organizationId, formId) => {
  return dispatch => {
    fetch(`/api/v1/organizations/${organizationId}/forms/${formId}/values`, {
      credentials: "include"
    })
      .then(response => response.json())
      .then(values => values.data.map(value => camelcaseKeys(value.attributes)))
      .then(values => dispatch({ type: "FETCH_VALUES", values }));
  };
};

export const addValue = value => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(
      `/api/v1/organizations/${value.organizationId}/forms/${value.formId}/values`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(snakecaseKeys({ value }))
      }
    )
      .then(response => response.json())
      .then(value => {
        if (!value.errors) {
          dispatch({
            type: "ADD_VALUE",
            value: camelcaseKeys(value.data.attributes)
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: value.messages || ["Changes saved successfully."]
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: value.errors });
        }
      })
      .catch(console.log);
  };
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(snakecaseKeys({ value }))
      }
    )
      .then(response => response.json())
      .then(value => {
        if (!value.errors) {
          console.log(value);
          dispatch({
            type: "UPDATE_VALUE",
            value: camelcaseKeys(value.data.attributes)
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: value.messages || ["Changes saved successfully."]
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: value.errors });
        }
      })
      .catch(console.log);
  };
};
