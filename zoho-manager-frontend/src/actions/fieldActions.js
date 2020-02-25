const camelcaseKeys = require("camelcase-keys");

export const addField = field => {
  return dispatch => {
    fetch(
      `/organizations/${field.organization_id}/forms/${field.form_id}/fields`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ field: { ...field } })
      }
    )
      .then(response => response.json())
      .then(field => camelcaseKeys(field.data.attributes))
      .then(field => dispatch({ type: "ADD_FIELD", field }));
  };
};

export const fetchFields = (organizationId, formId) => {
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms/${formId}/fields`)
      .then(response => response.json())
      .then(fields => fields.data.map(field => camelcaseKeys(field.attributes)))
      .then(fields => dispatch({ type: "ADD_FIELDS", fields }));
  };
};
