import snakecaseKeys from "snakecase-keys";
import cuid from "cuid";
import { handleErrors } from "./handleErrors";
import { add } from "./fetchActions";

export const addField = (field, organizationId) => {
  return dispatch => {
    return add(
      dispatch,
      `/api/v1/organizations/${organizationId}/forms/${field.formId}/fields`,
      { field }
    ).then(resp => {
      dispatch({
        type: "ADD_FIELD",
        field: { key: `resource_field_${resp.field.id}`, ...resp.field },
      });
      return dispatch({
        type: "ADD_RECORD_FIELD",
        recordField: resp.recordField,
      });
    });
  };
};

export const fetchFields = (organizationId, formId) => {
  return dispatch => {
    fetch(`/api/v1/organizations/${organizationId}/forms/${formId}/fields`, {
      cache: "no-cache",
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(fields =>
        dispatch({
          type: "FETCH_FIELDS",
          fields: fields.map(field => ({
            key: `resource_field_${field.id}`,
            ...field,
          })),
          formId,
        })
      );
  };
};

export const updateField = (field, organizationId, fieldId) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${field.formId}/fields/${fieldId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snakecaseKeys({ field })),
      }
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(field => {
        if (!field.errors) {
          dispatch({
            type: "UPDATE_FIELD",
            fieldId,
            field: { key: cuid(), ...field },
          });
          return { ...field, fieldId };
        } else {
          dispatch({ type: "ADD_ERRORS", errors: field.errors });
        }
      })
      .catch(resp => dispatch({ type: "ADD_ERRORS", errors: resp }));
  };
};

export const removeField = (organizationId, formId, fieldId) => {
  return dispatch => {
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${formId}/fields/${fieldId}`,
      {
        method: "DELETE",
      }
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(field =>
        field.message
          ? dispatch({ type: "REMOVE_FIELD", fieldId, status: "deleted" })
          : null
      );
  };
};
