export const adminsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ADMIN":
      return [...state, action.admin];
    case "ADD_ADMINS":
      return [...state, ...action.admins];
    default:
      return state;
  }
};
