import { handleErrors } from "./handleErrors";

const camelcaseKeys = require("camelcase-keys");

export const addRecord = (record, organizationId, formId) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(`/api/v1/organizations/${organizationId}/forms/${formId}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ record })
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(record => {
        if (!record.errors) {
          dispatch({
            type: "ADD_RECORD",
            record: camelcaseKeys(record.data.attributes)
          });
          dispatch({
            type: "UPDATE_RECORDS_COUNT",
            resourceId: formId
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: ["Record was successfully created."]
          });
          return camelcaseKeys(record.data.links.values);
        } else {
          dispatch({
            type: "ADD_ERRORS",
            messages: record.errors
          });
          return;
        }
      })
      .then(values => dispatch({ type: "ADD_VALUES", values }))
      .catch(console.log);
  };
};

export const fetchRecords = (organizationId, formId, offset) => {
  const query = offset ? `?offset=${offset}` : "";
  return dispatch => {
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${formId}/records${query}`
    )
      .then(response => response.json())
      .then(records => records.data.map(record => record))
      .then(records => {
        dispatch({
          type: "FETCH_RECORDS",
          records: records.map(record => camelcaseKeys(record.attributes)),
          formId
        });
        return records.map(record => camelcaseKeys(record.links.values));
      })
      .then(values =>
        dispatch({ type: "FETCH_VALUES", values: values.flat(), formId })
      );
  };
};

export const setRecordsSortedBy = resource => {
  return dispatch => dispatch({ type: "SET_SORTED_BY", resource });
};
