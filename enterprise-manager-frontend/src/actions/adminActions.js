export const addAdmin = admin => {
  return dispatch => {
    dispatch({ type: 'CLEAR_ALERTS' });
    fetch('/api/v1/admins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    })
      .then(response => response.json())
      .then(admin => {
        if (!admin.errors) {
          dispatch({ type: 'ADD_ADMIN', admin: admin.data.attributes });
          dispatch({
            type: 'ADD_MESSAGES',
            messages: admin.messages
          });
        } else {
          dispatch({ type: 'ADD_ERRORS', errors: admin.errors });
        }
      })
      .catch(console.log);
  };
};

export const fetchAdmins = () => {
  return dispatch => {
    dispatch({ type: 'REQUESTING_DATA' });
    return fetch('/api/v1/admins')
      .then(response => response.json())
      .then(admins => admins.data.map(admin => admin.attributes))
      .then(admins => dispatch({ type: 'ADD_ADMINS', admins }))
      .then(() => dispatch({ type: 'FINISHED_REQUESTING' }));
  };
};
