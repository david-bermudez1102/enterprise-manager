export const addZohoResources = (zohoResource, type) => {
  const zoho_path = `/api/v1/organizations/${zohoResource.organization_id}/forms/${zohoResource.form_id}/zoho_books`;
  const paths = {
    contacts: `${zoho_path}/contacts`,
    items: `${zoho_path}/items`
  };

  return dispatch => {
    fetch(paths[type], {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
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
