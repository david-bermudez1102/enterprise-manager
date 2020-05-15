import { handleErrors } from "./handleErrors";
import { remove, update } from "./fetchActions";

export const addResource = resource => {
  const organizationsPath = `/api/v1/organizations/${resource.organizationId}`;
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(`${organizationsPath}/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({ form: resource }),
    })
      .catch(handleErrors)
      .then(response => response.json())
      .then(resource => {
        if (!resource.errors) {
          dispatch({
            type: "ADD_RESOURCE",
            resource,
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: resource.messages || ["Resource added successfully."],
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
    return fetch(`/api/v1/organizations/${organizationId}/forms`, {
      credentials: "include",
      cache: "no-cache",
    })
      .then(response => response.json())
      .then(resources => dispatch({ type: "FETCH_RESOURCES", resources }))
      .catch(console.log);
  };
};

export const updateResource = resource => {
  return dispatch =>
    update(
      dispatch,
      `/api/v1/organizations/${resource.organizationId}/forms/${resource.id}`,
      { form: resource },
      {
        type: "UPDATE_RESOURCE",
        resource,
      }
    );
};

export const removeResource = (organizationId, id) => {
  return dispatch => {
    return remove(
      dispatch,
      `/api/v1/organizations/${organizationId}/forms/${id}`,
      id,
      "REMOVE_RESOURCE",
      {
        type: "REMOVE_RECORDS",
        resourceId: id,
      }
    );
  };
};
