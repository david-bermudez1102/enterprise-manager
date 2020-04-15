const camelcaseKeys = require("camelcase-keys");

export const addRecord = (record, organizationId, formId) => {
  return dispatch => {
    fetch(`/api/v1/organizations/${organizationId}/forms/${formId}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ record })
    })
      .then(response => response.json())
      .then(record => {
        dispatch({
          type: "ADD_RECORD",
          record: camelcaseKeys(record.data.attributes)
        });
        dispatch({
          type: "UPDATE_RECORDS_COUNT",
          resourceId: formId
        });
        return camelcaseKeys(record.data.links.values);
      })
      .then(values => dispatch({ type: "ADD_VALUES", values }));
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
          records: records.map(record => camelcaseKeys(record.attributes))
        });
        return records.map(record => camelcaseKeys(record.links.values));
      })
      .then(values =>
        dispatch({ type: "FETCH_VALUES", values: values.flat() })
      );
  };
};

export const setRecordsSortedBy = resource => {
  return dispatch => dispatch({ type: "SET_SORTED_BY", resource });
};
