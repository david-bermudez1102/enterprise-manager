export const addField = field => {
  return dispatch => {
    fetch(
      `/organizations/${field.organization_id}/forms/${field.form_id}/fields`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ form: { ...field } })
      }
    )
      .then(response => response.json())
      .then(field => field.data.attributes)
      .then(field => dispatch({ type: "ADD_FIELD", field }));
  };
};

export const fetchFields = organizationId => {
  return dispatch => {
    fetch(`/organizations/${organizationId}/forms`)
      .then(response => response.json())
      .then(fields => fields.data.map(field => field.attributes))
      .then(fields => dispatch({ type: "ADD_FIELDS", fields }));
  };
};
