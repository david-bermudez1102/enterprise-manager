export const fetchRecordsWithWorker = (state, formId, organizationId) => {
  const normalize = (state, payload, formId) => {
    return [
      ...state
        .filter(
          prevPayload =>
            prevPayload.formId !== parseInt(formId) ||
            payload.some(p => p.id === prevPayload.id)
        )
        .map(prevPayload => {
          const updatedPayload = payload.find(p => prevPayload.id === p.id);
          if (prevPayload !== updatedPayload && updatedPayload)
            return updatedPayload;
          return prevPayload;
        }),
      ...payload.filter(
        newPayload =>
          !state.some(prevPayload => prevPayload.id === newPayload.id)
      )
    ];
  };
  return fetch(
    `http://localhost:3001/api/v1/organizations/${organizationId}/forms/${formId}/records`,
    {
      cache: "no-cache"
    }
  )
    .then(response => response.json())
    .then(response => {
      const records = normalize(
        state.records,
        response.map(r => r.attributes),
        formId
      );
      const values = normalize(
        state.values,
        response.map(r => r.links.values),
        formId
      ).flat();

      return { records, values };
    });
};
