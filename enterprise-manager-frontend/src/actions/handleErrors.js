export const handleErrors = response => {
  if (!response.ok) {
    return response.text().then(resp => {
      throw new Error(`${response.status} - ${resp}`)
    })
  }

  return response.json()
}

export const displayErrors = (resp, dispatch) => {
  return dispatch({ type: "ADD_ERRORS", errors: [resp.toString()] })
}
