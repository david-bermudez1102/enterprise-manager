export const addEmployee = (adminId, employee) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(`/api/v1/admins/${adminId}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    })
      .then(response => response.json())
      .then(employee => {
        if (!employee.errors) {
          dispatch({
            type: "ADD_EMPLOYEE",
            employee: employee.data.attributes
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: employee.messages || ["Employee was added with success."]
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: employee.errors });
        }
      })
      .catch(console.log);
  };
};

export const fetchEmployees = adminId => {
  return dispatch => {
    fetch(`/api/v1/admins/${adminId}/employees`)
      .then(response => response.json())
      .then(employees => employees.data.map(employee => employee.attributes))
      .then(employees => dispatch({ type: "FETCH_EMPLOYEES", employees }));
  };
};

export const addManager = (adminId, manager) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(`/api/v1/admins/${adminId}/managers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(manager)
    })
      .then(response => response.json())
      .then(manager => {
        if (!manager.errors) {
          dispatch({ type: "ADD_MANAGER", manager: manager.data.attributes });
          dispatch({
            type: "ADD_MESSAGES",
            messages: manager.messages || ["Manager was added with success."]
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: manager.errors });
        }
      })
      .catch(console.log);
  };
};

export const fetchManagers = adminId => {
  return dispatch => {
    fetch(`/api/v1/admins/${adminId}/managers`)
      .then(response => response.json())
      .then(managers => managers.data.map(manager => manager.attributes))
      .then(managers => dispatch({ type: "FETCH_MANAGERS", managers }));
  };
};

export const removeAccount = (accountId, type) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(`/api/v1/accounts/${accountId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(account => {
        if (!account.errors) {
          dispatch({
            type: "ADD_MESSAGES",
            messages: account.messages || ["Account was deleted with success."]
          });
          return dispatch({
            type,
            accountId
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: account.errors });
        }
      })
      .catch(console.log);
  };
};

/* export const accountAction = (method, action, data) => {
  return dispatch => {
    fetch(`/api/v1/accounts/${accountId}`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: data ? JSON.stringify(data) : undefined
    })
      .then(resp => resp.json())
      .then(resp => resp.data.map(manager => manager.attributes))
      .then(managers => dispatch({ type: action, managers }));
  };
}; */
