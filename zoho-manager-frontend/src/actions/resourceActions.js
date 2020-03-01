const camelcaseKeys = require("camelcase-keys");

export const addResource = (resource, history) => {
  const organizationsPath = `/api/v1/organizations/${resource.organization_id}`;
  return dispatch => {
    fetch(`${organizationsPath}/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ form: { ...resource } })
    })
      .then(response => response.json())
      .then(resource => camelcaseKeys(resource.data.attributes))
      .then(resource => dispatch({ type: "ADD_RESOURCE", resource }))
      .then(action =>
        history.push(
          `/organizations/${resource.organization_id}/resources/${action.resource.id}`
        )
      );
  };
};

export const fetchResources = organizationId => {
  return dispatch => {
    fetch(`/api/v1/organizations/${organizationId}/forms`)
      .then(response => response.json())
      .then(resources =>
        resources.data.map(resource => camelcaseKeys(resource.attributes))
      )
      .then(resources => dispatch({ type: "FETCH_RESOURCES", resources }));
  };
};
