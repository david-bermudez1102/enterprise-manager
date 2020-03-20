import jsonToFormData from "json-form-data";
import camelcaseKeys from "camelcase-keys";
export const addAdmin = admin => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch("/api/v1/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(admin)
    })
      .then(response => response.json())
      .then(admin => {
        if (!admin.errors) {
          dispatch({ type: "ADD_ADMIN", admin: camelcaseKeys(admin.data.attributes) });
          dispatch({
            type: "ADD_MESSAGES",
            messages: admin.messages
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: admin.errors });
        }
      })
      .catch(console.log);
  };
};

export const updateAdmin = (admin, adminId) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(`/api/v1/admins/${adminId}`, {
      credentials: "include",
      method: "PATCH",
      body: jsonToFormData({ admin })
    })
      .then(response => response.json())
      .then(admin => {
        if (!admin.errors) {
          console.log(admin.data.attributes);
          dispatch({ type: "UPDATE_ADMIN", admin: camelcaseKeys(admin.data.attributes), adminId });
          dispatch({ type: "UPDATE_SESSION", currentUser: camelcaseKeys(admin.data.attributes) });
          dispatch({
            type: "ADD_MESSAGES",
            messages: admin.messages
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: admin.errors });
        }
      })
      .catch(console.log);
  };
};

export const fetchAdmins = () => {
  return dispatch => {
    dispatch({ type: "REQUESTING_DATA" });
    return fetch("/api/v1/admins")
      .then(response => response.json())
      .then(admins => admins.data.map(admin => camelcaseKeys(admin.attributes)))
      .then(admins => dispatch({ type: "ADD_ADMINS", admins }))
      .then(() => dispatch({ type: "FINISHED_REQUESTING" }));
  };
};
