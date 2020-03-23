const camelcaseKeys = require("camelcase-keys");

export const addField = (field, organizationId) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
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
      .then(f => {
        if (!f.errors) {
          dispatch({
            type: "ADD_FIELD",
            field: camelcaseKeys(f.data.attributes)
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: f.messages || ["Field added successfully."]
          });
          return { ...field, field_id: f.data.id };
        } else {
          dispatch({ type: "ADD_ERRORS", errors: f.errors });
        }
      })
      .catch(resp => dispatch({ type: "ADD_ERRORS", errors: resp.errors }));
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
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(
      `/api/v1/organizations/${organizationId}/forms/${field.form_id}/fields/${fieldId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ field })
      }
    )
      .then(response => response.json())
      .then(field => {
        if (!field.errors) {
          dispatch({
            type: "UPDATE_FIELD",
            fieldId,
            field: camelcaseKeys(field.data.attributes)
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: field.data.messages || ["Field updated successfully."]
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: field.errors });
        }
      })
      .catch(resp => dispatch({ type: "ADD_ERRORS", errors: resp.errors }));
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
