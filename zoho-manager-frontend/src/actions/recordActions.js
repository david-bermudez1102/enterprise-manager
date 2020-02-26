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
      .then(record => record.data)
      .then(record => {
        dispatch({ type: "ADD_RECORD", record: camelcaseKeys(record.attributes) });
        return camelcaseKeys(record.links.values);
      })
      .then(values => dispatch({ type: "ADD_VALUES", values }));
  };
};

export const fetchRecords = (organizationId, formId) => {
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms/${formId}/records`)
      .then(response => response.json())
      .then(records => records.data.map(record => record))
      .then(records => {
        dispatch({
          type: "ADD_RECORDS",
          records: records.map(record => camelcaseKeys(record.attributes))
        });
        return records.map(record => camelcaseKeys(record.links.values));
      })
      .then(recordsValues =>
        recordsValues.map(values => dispatch({ type: "ADD_VALUES", values }))
      );
  };
};
