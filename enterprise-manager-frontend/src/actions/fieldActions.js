import snakecaseKeys from "snakecase-keys";
import cuid from "cuid";
import { handleErrors } from "./handleErrors";

export const addField = (field, organizationId) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${field.formId}/fields`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(snakecaseKeys({ field }))
      }
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(f => {
        if (!f.errors) {
          dispatch({
            type: "ADD_FIELD",
            field: { key: cuid(), ...f }
          });
          return { ...field, fieldId: f.id };
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
      .then(handleErrors)
      .then(response => response.json())
      .then(fields =>
        dispatch({
          type: "FETCH_FIELDS",
          fields: fields.map(field => ({ key: cuid(), ...field })),
          formId
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(snakecaseKeys({ field }))
      }
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(field => {
        if (!field.errors) {
          dispatch({
            type: "UPDATE_FIELD",
            fieldId,
            field: { key: cuid(), ...field }
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
        method: "DELETE"
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
