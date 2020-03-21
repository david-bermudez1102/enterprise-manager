const camelcaseKeys = require("camelcase-keys");

export const addResource = resource => {
  const organizationsPath = `/api/v1/organizations/${resource.organization_id}`;
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(`${organizationsPath}/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ form: { ...resource } })
    })
      .then(response => response.json())
      .then(resource => {
        if (!resource.errors) {
          dispatch({
            type: "ADD_RESOURCE",
            resource: camelcaseKeys(resource.data.attributes)
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: resource.messages || ["Resource added successfully."]
          });
          return camelcaseKeys(resource.data.attributes);
        } else {
          dispatch({ type: "ADD_ERRORS", errors: resource.errors });
        }
      })
      .catch(console.log);
  };
};

export const fetchResources = organizationId => {
  return dispatch => {
    return fetch(`/api/v1/organizations/${organizationId}/forms`)
      .then(response => response.json())
      .then(resources =>
        resources.data.map(resource => camelcaseKeys(resource.attributes))
      )
      .then(resources => dispatch({ type: "FETCH_RESOURCES", resources }))
      .catch(console.log);
  };
};

export const updateResource = (resource, organizationId, resourceId) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${resourceId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ form: { ...resource } })
      }
    )
      .then(response => response.json())
      .then(resource => {
        if (!resource.errors) {
          dispatch({
            type: "UPDATE_RESOURCE",
            resourceId,
            resource: camelcaseKeys(resource.data.attributes)
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: resource.messages || ["Resource updated successfully."]
          });
          return camelcaseKeys(resource.data.attributes);
        } else {
          dispatch({ type: "ADD_ERRORS", errors: resource.errors });
        }
      })
      .catch(console.log);
  };
};

export const removeResource = (organizationId, resourceId) => {
  return dispatch => {
    return fetch(
      `/api/v1/organizations/${organizationId}/forms/${resourceId}`,
      {
        method: "DELETE"
      }
    )
      .then(response => response.json())
      .then(resource => camelcaseKeys(resource))
      .then(resource =>
        resource.message
          ? dispatch({
              type: "REMOVE_RESOURCE",
              resourceId,
              status: "deleted"
            })
          : null
      );
  };
};
