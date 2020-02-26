const camelcaseKeys = require("camelcase-keys");

export const addRecord = (record, organizationId, formId) => {
  console.log(JSON.stringify({ record: { ...record } }));
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms/${formId}/records`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ record: { ...record } })
    })
      .then(response => response.json())
      .then(record => camelcaseKeys(record.data.attributes))
      .then(record => dispatch({ type: "ADD_RECORD", record }));
  };
};

export const fetchRecords = () => {
  return dispatch => {
    fetch("/records")
      .then(response => response.json())
      .then(records =>
        records.data.map(record => record.attributes)
      )
      .then(records =>
        dispatch({ type: "ADD_RECORDS", records })
      );
  };
};
