const camelcaseKeys = require('camelcase-keys');

export const addResource = (resource, history) => {
  const organizationsPath = `/api/v1/organizations/${resource.organization_id}`;
  return dispatch => {
    fetch(`${organizationsPath}/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ form: { ...resource } })
    })
      .then(response => response.json())
      .then(resource => camelcaseKeys(resource.data.attributes))
      .then(resource => dispatch({ type: 'ADD_RESOURCE', resource }))
      .then(action =>
        history.push(
          `/organizations/${resource.organization_id}/resources/${action.resource.formAlias}`
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
      .then(resources => dispatch({ type: 'FETCH_RESOURCES', resources }));
  };
};

export const updateResource = (resource, organizationId, resourceId) => {
  return dispatch => {
    dispatch({ type: 'CLEAR_ALERTS' });
    fetch(`/api/v1/organizations/${organizationId}/forms/${resourceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ form: { ...resource } })
    })
      .then(response => response.json())
      .then(resource => camelcaseKeys(resource.data.attributes))
      .then(resource => {
        if (!resource.errors) {
          dispatch({ type: 'UPDATE_RESOURCE', resourceId, resource });
          dispatch({
            type: 'ADD_MESSAGES',
            messages: resource.messages
          });
        } else {
          dispatch({ type: 'ADD_ERRORS', errors: resource.errors });
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
        method: 'DELETE'
      }
    )
      .then(response => response.json())
      .then(resource => camelcaseKeys(resource))
      .then(resource =>
        resource.message
          ? dispatch({
              type: 'REMOVE_RESOURCE',
              resourceId,
              status: 'deleted'
            })
          : null
      );
  };
};
