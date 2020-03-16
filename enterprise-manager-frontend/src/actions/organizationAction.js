import jsonToFormData from "json-form-data";
const camelcaseKeys = require("camelcase-keys");

export const addOrganization = organization => {
  return dispatch => {
    dispatch({ type: "REQUESTING_DATA" });
    fetch("/api/v1/organizations", {
      method: "POST",
      body: jsonToFormData(organization)
    })
      .then(response => response.json())
      .then(organization => organization.data.attributes)
      .then(organization =>
        dispatch({ type: "ADD_ORGANIZATION", organization })
      )
      .then(() => dispatch({ type: "FINISHED_REQUESTING" }));
  };
};

export const fetchOrganizations = () => {
  return dispatch => {
    dispatch({ type: "REQUESTING_DATA" });
    fetch("/api/v1/organizations")
      .then(response => response.json())
      .then(organizations =>
        organizations.data.map(organization =>
          camelcaseKeys(organization.attributes)
        )
      )
      .then(organizations =>
        dispatch({ type: "FETCH_ORGANIZATIONS", organizations })
      )
      .then(() => dispatch({ type: "FINISHED_REQUESTING" }));
  };
};

export const updateOrganization = (organization, organizationId) => {
  return dispatch => {
    return fetch(`/api/v1/organizations/${organizationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ organization: { ...organization } })
    })
      .then(response => response.json())
      .then(organization => camelcaseKeys(organization.data.attributes))
      .then(organization => {
        if (organization.message === "success") {
          dispatch({
            type: "UPDATE_ORGANIZATION",
            organizationId,
            organization
          });
          return organization;
        } else if (organization.message === "error") {
          console.log(organization.messages);
          return organization;
        }
      })
      .catch(console.log);
  };
};
