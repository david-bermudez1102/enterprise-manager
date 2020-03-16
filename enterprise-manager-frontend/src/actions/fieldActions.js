const camelcaseKeys = require("camelcase-keys");

export const addField = (field, organizationId) => {
  return dispatch => {
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${field.form_id}/fields`,
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
      .then(f => {
        dispatch({ type: "ADD_FIELD", field: f });
        return { ...field, field_id: f.id };
      });
  };
};

export const fetchFields = (organizationId, formId) => {
  return dispatch => {
    fetch(`/api/v1/organizations/${organizationId}/forms/${formId}/fields`)
      .then(response => response.json())
      .then(fields => fields.data.map(field => camelcaseKeys(field.attributes)))
      .then(fields => dispatch({ type: "FETCH_FIELDS", fields }));
  };
};

export const updateField = (field, organizationId, fieldId) => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${organizationId}/forms/${field.form_id}/fields/${fieldId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ field: { ...field } })
      }
    )
      .then(response => response.json())
      .then(field => camelcaseKeys(field.data.attributes))
      .then(field => dispatch({ type: "UPDATE_FIELD", fieldId, field }));
  };
};

export const removeField = (organizationId, formId, fieldId) => {
  return dispatch => {
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${formId}/fields/${fieldId}`,
      {
        method: "DELETE"
      }
    )
      .then(response => response.json())
      .then(field => camelcaseKeys(field))
      .then(field =>
        field.message
          ? dispatch({ type: "REMOVE_FIELD", fieldId, status: "deleted" })
          : null
      );
  };
};