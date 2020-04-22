export default () => {
  /* eslint-disable-next-line no-restricted-globals */
  self.addEventListener("message", e => {
    if (!e) return;
    /* eslint-disable-next-line no-restricted-globals */
    const normalize = (state, payload, formId) => {
      return [
        ...state
          .filter(
            prevPayload =>
              prevPayload.formId !== formId ||
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
    fetch(
      `http://localhost:3001/api/v1/organizations/${e.data.organizationId}/forms/${e.data.formId}/records`,
      {
        cache: "no-cache"
      }
    )
      .then(response => response.json())
      .then(response => {
        const records = normalize(
          e.data.state.records,
          response.map(r => r.attributes),
          e.data.formId
        );
        const values = normalize(
          e.data.state.values,
          response.map(r => r.links.values),
          e.data.formId
        ).flat();

        return { records, values };
      })
      .then(({ records, values }) =>
        postMessage([
          { type: "FETCH_RECORDS", records: records },
          { type: "FETCH_VALUES", values: values }
        ])
      );
  });
};
