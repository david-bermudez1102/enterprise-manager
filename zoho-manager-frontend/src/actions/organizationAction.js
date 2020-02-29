import jsonToFormData from "json-form-data";

export const addOrganization = organization => {
  return dispatch => {
    fetch("/api/v1/organizations", {
      method: "POST",
      body: jsonToFormData(organization)
    })
      .then(response => response.json())
      .then(organization => organization.data.attributes)
      .then(organization =>
        dispatch({ type: "ADD_ORGANIZATION", organization })
      );
  };
};

export const fetchOrganizations = () => {
  return dispatch => {
    fetch("/api/v1/organizations")
      .then(response => response.json())
      .then(organizations =>
        organizations.data.map(organization => organization.attributes)
      )
      .then(organizations =>
        dispatch({ type: "FETCH_ORGANIZATIONS", organizations })
      );
  };
};
