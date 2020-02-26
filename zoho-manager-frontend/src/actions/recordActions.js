const camelcaseKeys = require("camelcase-keys");

export const addRecord = (record, organizationId, formId) => {
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms/${formId}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ record: { ...record } })
    })
      .then(response => response.json())
      .then(record => camelcaseKeys(record.data))
      .then(record => {
        dispatch({ type: "ADD_RECORD", record: record.attributes });
        return record.links.values;
      })
      .then(values => dispatch({ type: "ADD_VALUES", values }));
  };
};

export const fetchRecords = (organizationId, formId) => {
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms/${formId}/records`)
      .then(response => response.json())
      .then(records => records.data.map(record => camelcaseKeys(record.attributes)))
      .then(records => dispatch({ type: "ADD_RECORDS", records }));
  };
};