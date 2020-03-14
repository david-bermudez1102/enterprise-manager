export const addContacts = contact => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${contact.organization_id}/forms/${contact.form_id}/zoho_books/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      })
      .then(records => records.map(record => record.data.attributes))
      .then(records =>
        records.map(record => dispatch({ type: "UPDATE_RECORD", record }))
      )
      .catch(console.log);
  };
};
