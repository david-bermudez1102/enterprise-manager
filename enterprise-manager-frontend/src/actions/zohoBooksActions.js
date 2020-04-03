import camelcaseKeys from "camelcase-keys";

export const addZohoResources = (zohoResource, type) => {
  const zoho_path = `/api/v1/organizations/${zohoResource.organization_id}/forms/${zohoResource.form_id}/zoho_books`;
  const paths = {
    contacts: `${zoho_path}/contacts`,
    items: `${zoho_path}/items`,
    invoices: `${zoho_path}/invoices`
  };

  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(paths[type], {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(records => {
        console.log(records);
        records.map(record => {
          if (!record.errors) {
            dispatch({
              type: "UPDATE_RECORD",
              record: camelcaseKeys(record.data.attributes)
            });
            dispatch({
              type: "ADD_MESSAGES",
              messages: ["Records sent to zoho successfully"]
            });
          } else {
            dispatch({
              type: "ADD_ERRORS",
              errors: record.errors
            });
          }
        });
      })
      .catch(console.log);
  };
};

export const updateAllContacts = contact => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${contact.organization_id}/forms/${contact.form_id}/zoho_books/contacts/update_all`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: { contact: { ...contact } }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      });
  };
};

export const updateContact = contact => {
  return dispatch => {
    fetch(
      `/api/v1/organizations/${contact.organization_id}/forms/${contact.form_id}/zoho_books/contacts/${contact.record_zoho_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: { contact: { ...contact } }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      });
  };
};
