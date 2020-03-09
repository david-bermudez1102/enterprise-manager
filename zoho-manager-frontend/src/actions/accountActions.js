export const addEmployee = (adminId, employee) => {
  return dispatch => {
    fetch(`/api/v1/${adminId}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employee)
    })
      .then(response => response.json())
      .then(employee => employee.data.attributes)
      .then(employee => dispatch({ type: "ADD_EMPLOYEE", employee }));
  };
};

export const fetchEmployees = adminId => {
  return dispatch => {
    fetch(`/api/v1/admins/${adminId}/employees`)
      .then(response => response.json())
      .then(employees => employees.data.map(employee => employee.attributes))
      .then(employees => dispatch({ type: "ADD_EMPLOYEES", employees }));
  };
};

export const addManager = (adminId, manager) => {
  return dispatch => {
    fetch(`/api/v1/${adminId}/managers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(manager)
    })
      .then(response => response.json())
      .then(manager => manager.data.attributes)
      .then(manager => dispatch({ type: "ADD_MANAGER", manager }));
  };
};

export const fetchManagers = adminId => {
  return dispatch => {
    fetch(`/api/v1/admins/${adminId}/managers`)
      .then(response => response.json())
      .then(managers => managers.data.map(manager => manager.attributes))
      .then(managers => dispatch({ type: "ADD_MANAGERS", managers }));
  };
};
