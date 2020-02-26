export const addRecord = record => {
  return dispatch => {
    fetch("/records", {
      method: "POST",
      body: record
    })
      .then(response => response.json())
      .then(record => record.data.attributes)
      .then(record =>
        dispatch({ type: "ADD_RECORD", record })
      );
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
