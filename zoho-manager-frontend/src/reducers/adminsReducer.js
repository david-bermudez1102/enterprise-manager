export const adminsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ADMIN":
      console.log([...state, action.admin]);
      return [...state, action.admin];
    case "ADD_ADMINS":
      console.log([...state, ...action.admins]);
      return [...state, ...action.admins];
    default:
      return state;
  }
};
