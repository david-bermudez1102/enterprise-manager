import { handleErrors } from "./handleErrors";
import worker from "workerize-loader!../workers/worker"; // eslint-disable-line import/no-webpack-loader-syntax

const workerInstance = worker();

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
            record: record.attributes,
            formId
          });
          dispatch({
            type: "UPDATE_RECORDS_COUNT",
            resourceId: formId
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: ["Record was successfully created."]
          });
          return record.links.values;
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
  //const query = offset ? `?offset=${offset}` : "";
  return (dispatch, getState) => {
    const { records, values } = getState();
    workerInstance
      .fetchRecordsWithWorker({ records, values }, formId, organizationId)
      .then(({ records, values }) => {
        dispatch({ type: "FETCH_RECORDS", records });
        dispatch({ type: "FETCH_VALUES", values });
      });
  };
};

export const setSortedRecords = (records, formId) => {
  return dispatch => dispatch({ type: "SET_SORTED_RECORDS", records, formId });
};

export const setRecordsSortedBy = resource => {
  return dispatch => dispatch({ type: "SET_SORTED_BY", resource });
};
