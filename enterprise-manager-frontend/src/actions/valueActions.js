const camelcaseKeys = require("camelcase-keys");

export const fetchValues = (organizationId, formId) => {
  return dispatch => {
    fetch(`/api/v1/organizations/${organizationId}/forms/${formId}/values`)
      .then(response => response.json())
      .then(values => values.data.map(value => camelcaseKeys(value.attributes)))
      .then(values => dispatch({ type: "FETCH_VALUES", values }));
  };
};

export const updateValue = (value, currentUser) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(
      `/api/v1/organizations/${currentUser.organizationId}/forms/${value.formId}/values/${value.id}`,
      {
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ value })
      }
    )
      .then(response => response.json())
      .then(value => {
        if (!value.errors) {
          console.log(value.data.attributes);
          dispatch({
            type: "UPDATE_VALUE",
            value: camelcaseKeys(value.data.attributes)
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: value.messages || ["Record updated successfully."]
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: admin.errors });
        }
      })
      .catch(console.log);
  };
};
