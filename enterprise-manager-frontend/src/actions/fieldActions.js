import { handleErrors } from "./handleErrors"
import { add, update, getAll } from "./fetchActions"

export const addField = (field, organizationId) => dispatch =>
  add(
    dispatch,
    `/api/v1/organizations/${organizationId}/forms/${field.formId}/fields`,
    { field },
    resp =>
      dispatch({
        type: "ADD_FIELD",
        field: { key: `resource_field_${resp.field.id}`, ...resp.field }
      }),
    resp =>
      dispatch({
        type: "ADD_RECORD_FIELD",
        recordField: resp.recordField
      })
  )

export const updateField = (field, organizationId) => dispatch =>
  update(
    dispatch,
    `/api/v1/organizations/${organizationId}/forms/${field.formId}/fields/${field.id}`,
    { field },
    resp =>
      dispatch({
        type: "UPDATE_FIELD",
        field: { key: `resource_field_${resp.field.id}`, ...resp.field }
      }),
    resp =>
      dispatch({
        type: "UPDATE_RECORD_FIELD",
        recordField: {
          key: `resource_field_${resp.recordField.id}`,
          ...resp.recordField
        }
      })
  )

export const fetchFields = (organizationId, formId) => dispatch =>
  getAll(dispatch, `/api/v1/organizations/${organizationId}/fields`, fields =>
    dispatch({
      type: "FETCH_FIELDS",
      fields: fields.map(field => ({
        key: `resource_field_${field.id}`,
        ...field
      })),
      formId
    })
  )

export const removeField = (organizationId, formId, fieldId) => {
  return dispatch => {
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${formId}/fields/${fieldId}`,
      {
        method: "DELETE"
      }
    )
      .then(handleErrors)
      .then(field =>
        field.message
          ? dispatch({ type: "REMOVE_FIELD", fieldId, status: "deleted" })
          : null
      )
  }
}
