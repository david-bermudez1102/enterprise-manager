export const adminsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ADMIN":
      return [...state, action.admin];
    case "ADD_ADMINS":
      return [...state, ...action.admins];
    case "UPDATE_ADMIN":
      const admin = state.find(admin => admin.id === parseInt(action.adminId));
      return [...state.map(a => (a.id === admin.id ? action.admin : a))];
    default:
      return state;
  }
};
