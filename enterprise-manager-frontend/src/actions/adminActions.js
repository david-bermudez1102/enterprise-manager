export const addAdmin = admin => {
  return dispatch => {
    dispatch({ type: "REQUESTING_DATA" });
    fetch("/api/v1/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(admin)
    })
      .then(response => response.json())
      .then(admin => admin.data.attributes)
      .then(admin => dispatch({ type: "ADD_ADMIN", admin }))
      .then(() => dispatch({ type: "FINISHED_REQUESTING" }));
  };
};

export const fetchAdmins = () => {
  return dispatch => {
    dispatch({ type: "REQUESTING_DATA" });
    return fetch("/api/v1/admins")
      .then(response => response.json())
      .then(admins => admins.data.map(admin => admin.attributes))
      .then(admins => dispatch({ type: "ADD_ADMINS", admins }))
      .then(() => dispatch({ type: "FINISHED_REQUESTING" }));
  };
};
