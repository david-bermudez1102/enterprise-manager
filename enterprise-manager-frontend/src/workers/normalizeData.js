const normalize = (state, payload, formId) => {
  return [
    ...state
      .filter(
        (prevPayload) =>
          prevPayload.formId !== parseInt(formId) ||
          payload.some((p) => p.id === prevPayload.id)
      )
      .map((prevPayload) => {
        const updatedPayload = payload.find((p) => prevPayload.id === p.id);
        if (prevPayload !== updatedPayload && updatedPayload)
          return updatedPayload;
        return prevPayload;
      }),
    ...payload.filter(
      (newPayload) =>
        !state.some((prevPayload) => prevPayload.id === newPayload.id)
    ),
  ];
};
export default normalize;
