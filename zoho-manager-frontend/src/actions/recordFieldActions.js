const camelcaseKeys = require("camelcase-keys");

export const addRecordField = (recordField, organizationId) => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${organizationId}/forms/${recordField.form_id}/record_fields`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          record_field: { ...recordField }
        })
      }
    )
      .then(response => response.json())
      .then(recordField => camelcaseKeys(recordField.data.attributes))
      .then(recordField => dispatch({ type: "ADD_RECORD_FIELD", recordField }));
  };
};

export const fetchRecordFields = (organizationId, formId) => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${organizationId}/forms/${formId}/record_fields`
    )
      .then(response => response.json())
      .then(recordFields =>
        recordFields.data.map(recordField =>
          camelcaseKeys(recordField.attributes)
        )
      )
      .then(recordFields =>
        dispatch({ type: "FETCH_RECORD_FIELDS", recordFields })
      );
  };
};

export const removeRecordField = (organizationId, formId, recordFieldId) => {
  return dispatch => {
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${formId}/record_fields/${recordFieldId}`,
      {
        method: "DELETE"
      }
    )
      .then(response => response.json())
      .then(field => camelcaseKeys(field))
      .then(field =>
        field.message
          ? dispatch({
              type: "REMOVE_RECORD_FIELD",
              recordFieldId,
              status: "deleted"
            })
          : null
      );
  };
};
