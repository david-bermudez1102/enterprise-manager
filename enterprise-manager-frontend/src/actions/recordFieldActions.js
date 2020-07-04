import snakecaseKeys from "snakecase-keys"
import { handleErrors } from "./handleErrors"
import { update } from "./fetchActions"

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
        dispatch({ type: "ADD_RECORD_FIELD", recordField })
        dispatch({
          type: "ADD_MESSAGES",
          messages: recordField.messages || ["Field Added successfully."]
        })
      })
      .catch(resp => dispatch({ type: "ADD_ERRORS", errors: resp }))
  }
}

export const updateRecordField = recordField => dispatch =>
  update(
    dispatch,
    `/api/v1/organizations/${recordField.organizationId}/forms/${recordField.formId}/record_fields/${recordField.id}`,
    { recordField },
    recordField =>
      dispatch({
        type: "UPDATE_RECORD_FIELD",
        recordField
      })
  )

export const fetchRecordFields = (organizationId, formId) => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${organizationId}/forms/${formId}/record_fields`,
      { cache: "no-cache" }
    )
      .then(response => response.json())
      .then(recordFields =>
        dispatch({ type: "FETCH_RECORD_FIELDS", recordFields, formId })
      )
  }
}

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
      )
  }
}
