const camelcaseKeys = require("camelcase-keys");

export const fetchValues = (organizationId, formId) => {
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms/${formId}/values`)
      .then(response => response.json())
      .then(values =>
        values.data.map(value => camelcaseKeys(value.attributes))
      )
      .then(values => dispatch({ type: "ADD_VALUES", values }));
  };
};