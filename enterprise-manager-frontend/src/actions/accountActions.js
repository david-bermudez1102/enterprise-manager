import snakecaseKeys from "snakecase-keys";
import { handleErrors } from "./handleErrors";
import { message } from "antd";

export const addEmployee = (adminId, employee) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    fetch(`/api/v1/admins/${adminId}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(employee),
    })
      .then(response => response.json())
      .then(employee => {
        if (!employee.errors) {
          dispatch({
            type: "ADD_EMPLOYEE",
            employee: employee.data.attributes,
          });
          message.success("Employee was added with success.", 5);
        } else {
          employee.errors.map(err => message.error(err), 5);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(manager),
    })
      .then(response => response.json())
      .then(manager => {
        if (!manager.errors) {
          dispatch({ type: "ADD_MANAGER", manager: manager.data.attributes });
          message.success("Manager was added with success.", 5);
        } else {
          manager.errors.map(err => message.error(err), 5);
        }
      })
      .catch(console.log);
  };
};

export const updateAccount = account => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(`/api/v1/accounts/${account.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account }),
    })
      .then(response => response.json())
      .then(account => {
        if (!account.errors) {
          dispatch({
            type: "UPDATE_ACCOUNT",
            account: account.data.attributes,
          });
          message.success("Account saved with success.", 5);
        } else {
          account.errors.map(err => message.error(err), 5);
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

export const removeAccount = accountId => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(`/api/v1/accounts/${accountId}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(account => {
        if (!account.errors) {
          dispatch({
            type: "ADD_MESSAGES",
            messages: account.messages || ["Account was deleted with success."],
          });
          return dispatch({
            type: "REMOVE_ACCOUNT",
            accountId,
          });
        } else {
          dispatch({ type: "ADD_ERRORS", errors: account.errors });
        }
      })
      .catch(console.log);
  };
};

export const resetPassword = (token, activation) => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    return fetch(`/api/v1/account_unlock/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snakecaseKeys({ activation })),
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(response => {
        if (!response.errors) {
          dispatch({
            type: "REMOVE_TOKEN",
          });
          dispatch({
            type: "ADD_MESSAGES",
            messages: response.messages,
          });
          return "success";
        } else {
          dispatch({ type: "ADD_ERRORS", errors: response.errors });
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
