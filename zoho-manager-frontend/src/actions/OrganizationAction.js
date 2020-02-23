import jsonToFormData from "json-form-data";

export const addOrganization = organization => {
  return dispatch => {
    fetch("/organizations", {
      method: "POST",
      body: jsonToFormData(organization)
    })
      .then(response => response.json())
      .then(organization => {
        organization = organization.data.attributes;
        return dispatch({ type: "ADD_ORGANIZATION", organization})
      }
      );
  };
};
