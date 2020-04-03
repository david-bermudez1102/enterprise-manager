export const accountsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return [...state, action.employee];
    case "FETCH_EMPLOYEES":
      console.log([
        ...state,
        ...action.employees.filter(
          employee => !state.some(e => employee.id === e.id)
        )
      ]);
      return [
        ...state,
        ...action.employees.filter(
          employee => !state.some(e => employee.id === e.id)
        )
      ];
    case "UPDATE_EMPLOYEE":
      const employee = state.find(
        employee => employee.id === parseInt(action.employeeId)
      );
      return [...state.map(e => (e.id === employee.id ? action.employee : e))];
    case "REMOVE_EMPLOYEE":
      return [
        ...state.filter(employee => employee.id !== parseInt(action.accountId))
      ];
    case "ADD_MANAGER":
      return [...state, action.manager];
    case "FETCH_MANAGERS":
      return [
        ...state,
        ...action.managers.filter(
          manager => !state.some(m => manager.id === m.id)
        )
      ];
    case "UPDATE_MANAGER":
      const manager = state.find(
        manager => manager.id === parseInt(action.managerId)
      );
      return [...state.map(m => (m.id === manager.id ? action.manager : m))];
    case "REMOVE_MANAGER":
      return [
        ...state.filter(manager => manager.id !== parseInt(action.accountId))
      ];
    default:
      return state;
  }
};
