export const fetchRecordsWithWorker = (state, formId, organizationId) => {
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

  return fetch(
    `http://localhost:3001/api/v1/organizations/${organizationId}/forms/${formId}/records`,
    {
      cache: "no-cache",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      const records = normalize(
        state.records,
        response.map((r) => r.attributes),
        formId
      );
      const values = normalize(
        state.values,
        response.map((r) => r.links.values),
        formId
      ).flat();

      return { records, values };
    });
};

export const sortBy = (recordFieldId, records, values, ascendant, resource) => {
  if (recordFieldId !== 0) {
    const sortedValues = [...values]
      .filter((value) => value.recordFieldId === recordFieldId)
      .sort((value, memo) => {
        const valueA = value.content ? value.content.toUpperCase() : ""; // ignore upper and lowercase
        const valueB = memo.content ? memo.content.toUpperCase() : ""; // ignore upper and lowercase
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      });
    if (sortedValues.length > 0) {
      let sortedRecords = records
        .filter((record) => record.formId === resource.id)
        .sort((rec, memo) => {
          const x = sortedValues.find((value) => value.recordId === rec.id);
          const y = sortedValues.find((value) => value.recordId === memo.id);
          const valueA = x && x.content ? x.content.toUpperCase() : ""; // ignore upper and lowercase
          const valueB = y && y.content ? y.content.toUpperCase() : "";
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        });
      sortedRecords = ascendant ? sortedRecords : sortedRecords.reverse();
      return { sortedRecords };
    } else {
      return {
        message:
          "This column has no values. Using default column (#) to sort table.",
      };
    }
  } else {
    let sortedRecords = ascendant ? [...records] : [...records].reverse();
    return { sortedRecords };
  }
};

export const handleSortBy = (
  recordFieldId,
  orders,
  resource,
  records,
  values
) => {
  if (
    /* eslint-disable-next-line no-restricted-globals */
    self.WorkerGlobalScope
  ) {
    console.log("huzzah! a worker!");
  } else {
    console.log("window");
  }

  const order = orders.find((order) => order.recordFieldId === recordFieldId);
  const { sortedRecords, message } = sortBy(
    recordFieldId,
    records,
    values,
    order ? order.ascendant : false,
    resource
  );
  return { id: resource.id, recordFieldId, sortedRecords, orders, message };
};
