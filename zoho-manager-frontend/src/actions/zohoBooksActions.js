const camelcaseKeys = require("camelcase-keys");

export const addInvoice = (invoice, zohoOrganizationId, token) => {
  return dispatch => {
    return fetch(
      `https://books.zoho.com/api/v3/invoices?organization_id=${zohoOrganizationId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`
        },
        body: JSON.stringify({ invoice: { ...invoice } })
      }
    )
      .then(response => response.json())
      .then(invoice => camelcaseKeys(invoice.data.attributes))
      .then(f => {
        dispatch({ type: "ADD_FIELD", invoice: f });
        return { ...invoice, invoice_id: f.id };
      });
  };
};
