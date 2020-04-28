export const handleErrors = response => {
  if (!response.ok) throw new Error(response.statusText);
  return response;
};

export const displayErrors = (resp, dispatch) => {
  return dispatch({ type: "ADD_ERRORS", errors: [resp.toString()] });
};
