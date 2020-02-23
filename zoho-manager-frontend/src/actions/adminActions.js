import jsonToFormData from "json-form-data";

export const addAdmin = admin => {

  return dispatch => {
    fetch("/admins", {
      method: "POST",
      body: jsonToFormData(admin)
    })
      .then(response => response.json())
      .then(admin => admin.data.attributes)
      .then(admin =>
        dispatch({ type: "ADD_ADMIN", admin })
      );
  };
};

export const fetchAdmins = () => {
  return dispatch => {
    fetch("/admins")
      .then(response => response.json())
      .then(admins =>
        admins.data.map(admin => admin.attributes)
      )
      .then(admins =>
        dispatch({ type: "ADD_ADMINS", admins })
      );
  };
};
