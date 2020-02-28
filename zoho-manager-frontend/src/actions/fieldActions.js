const camelcaseKeys = require("camelcase-keys");

export const addField = (field, organizationId) => {
  return dispatch => {
    fetch(
      `/organizations/${organizationId}/forms/${field.form_id}/fields`,
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
      .then(fields => dispatch({ type: "FETCH_FIELDS", fields }));
  };
};

export const removeField = (organizationId, formId, fieldId) => {
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms/${formId}/fields/${fieldId}`, { method: "DELETE" })
      .then(response => camelcaseKeys(response.json()))
      .then(field => field.message ? dispatch({ type: "REMOVE_FIELD", fieldId }) : null);
  };
};
