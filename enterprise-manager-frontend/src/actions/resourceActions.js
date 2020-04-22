import { handleErrors } from "./handleErrors";

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
      body: JSON.stringify({ form: resource })
    })
      .catch(handleErrors)
      .then(response => response.json())
      .then(resource => {
        if (!resource.errors) {
          dispatch({
            type: "ADD_RESOURCE",
            resource
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: resource.messages || ["Resource added successfully."]
          });
          return resource;
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
        body: JSON.stringify({ form: resource })
      }
    )
      .then(response => response.json())
      .then(resource => {
        if (!resource.errors) {
          dispatch({
            type: "UPDATE_RESOURCE",
            resourceId,
            resource
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: resource.messages || ["Resource updated successfully."]
          });
          return resource;
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
      .then(resource => resource)
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
