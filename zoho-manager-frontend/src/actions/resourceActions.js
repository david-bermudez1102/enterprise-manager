const camelcaseKeys = require("camelcase-keys");

export const addResource = resource => {
  return dispatch => {
    fetch(`/organizations/${resource.organization_id}/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ form: { ...resource } })
    })
      .then(response => response.json())
      .then(resource => camelcaseKeys(resource.data.attributes))
      .then(resource => dispatch({ type: "ADD_RESOURCE", resource }))
  };
};

export const fetchResources = organizationId => {
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms`)
      .then(response => response.json())
      .then(resources =>
        resources.data.map(resource => camelcaseKeys(resource.attributes))
      )
      .then(resources => dispatch({ type: "ADD_RESOURCES", resources }));
  };
};
