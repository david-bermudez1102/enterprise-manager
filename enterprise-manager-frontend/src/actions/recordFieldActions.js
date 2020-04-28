import snakecaseKeys from "snakecase-keys";
import { handleErrors } from "./handleErrors";

export const addRecordField = (recordField, organizationId) => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${organizationId}/forms/${recordField.formId}/record_fields`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(snakecaseKeys({ recordField }))
      }
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(recordField => {
        dispatch({ type: "ADD_RECORD_FIELD", recordField });
        dispatch({
          type: "ADD_MESSAGES",
          messages: recordField.messages || ["Field updated successfully."]
        });
      })
      .catch(resp => dispatch({ type: "ADD_ERRORS", errors: resp }));
  };
};

export const updateRecordField = (
  recordField,
  organizationId,
  recordFieldId
) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(
      `/api/v1/organizations/${organizationId}/forms/${recordField.formId}/record_fields/${recordFieldId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(snakecaseKeys({ recordField }))
      }
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(recordField => {
        if (!recordField.errors) {
          dispatch({
            type: "UPDATE_RECORD_FIELD",
            recordFieldId,
            recordField
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: recordField.messages || ["Field updated successfully."]
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: recordField.errors });
        }
      })
      .catch(resp => dispatch({ type: "ADD_ERRORS", errors: resp }));
  };
};

export const fetchRecordFields = (organizationId, formId) => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${organizationId}/forms/${formId}/record_fields`
    )
      .then(response => response.json())
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
