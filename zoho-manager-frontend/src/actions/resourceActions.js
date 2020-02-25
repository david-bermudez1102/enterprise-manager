export const addResource = resource => {
  return dispatch => {
    fetch(`/organizations/${resource.organization_id}/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ form: {...resource } })
    })
      .then(response => response.json())
      .then(resource => resource.data.attributes)
      .then(resource => dispatch({ type: "ADD_RESOURCE", resource }));
  };
};

export const fetchResources = () => {
  return dispatch => {
    fetch("/forms")
      .then(response => response.json())
      .then(resources => resources.data.map(resource => resource.attributes))
      .then(resources => dispatch({ type: "ADD_ADMINS", resources }));
  };
};
