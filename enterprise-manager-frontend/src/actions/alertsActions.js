export const addInfoAlert = messages => {
  return dispatch => {
    dispatch({ type: "CLEAR_ALERTS" });
    dispatch({ type: "ADD_MESSAGES", messages });
  };
};
