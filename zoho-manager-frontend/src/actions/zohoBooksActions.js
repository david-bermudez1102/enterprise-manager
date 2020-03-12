const camelcaseKeys = require("camelcase-keys");

export const addInvoice = (invoice, token, zohoOrganizationId) => {
  return dispatch => {
    fetch(
      `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.fullaccess.all&client_id=1000.JA69R7B1955LLMWWDAU0E4FEOTB9XH&response_type=code&redirect_uri=https://accounts.zoho.com/oauth/v2/auth?&access_type=offline`,
      {
        mode: "no-cors",
        method: "GET",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
      .then(response => response.json())
      .then(console.log)
      .catch(console.log);
  };
};
