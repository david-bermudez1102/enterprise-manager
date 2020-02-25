export const addResource = resource => {
  return dispatch => {
    fetch("/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resource)
    })
      .then(response => response.json())
      .then(resource => resource.data.attributes)
      .then(resource => dispatch({ type: "ADD_RESOURCE", resource }));
  };
};

export const fetchResources = () => {
  return dispatch => {
    fetch("/resources")
      .then(response => response.json())
      .then(resources => resources.data.map(resource => resource.attributes))
      .then(resources => dispatch({ type: "ADD_ADMINS", resources }));
  };
};
