const camelcaseKeys = require("camelcase-keys");

export const fetchValues = (organizationId, formId) => {
  return dispatch => {
    fetch(`/api/v1/organizations/${organizationId}/forms/${formId}/key_values`)
      .then(response => response.json())
      .then(values => values.data.map(value => camelcaseKeys(value.attributes)))
      .then(values => dispatch({ type: "FETCH_VALUES", values }));
  };
};
