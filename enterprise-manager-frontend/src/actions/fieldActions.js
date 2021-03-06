import { add, update, getAll, remove } from "./fetchActions"

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
        ...field,
        key: `resource_field_${field.id}`
      })),
      formId
    })
  )

export const removeField = field => dispatch =>
  remove(
    `/api/v1/organizations/${field.organizationId}/forms/${field.formId}/fields/${field.id}`,
    field =>
      field.message
        ? dispatch({ type: "REMOVE_FIELD", field, status: "deleted" })
        : null
  )
