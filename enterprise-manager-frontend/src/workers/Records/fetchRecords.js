import normalize from "../normalizeData";

export const fetchRecords = (state, formId, organizationId) => {
  return fetch(
    `http://localhost:3001/api/v1/organizations/${organizationId}/forms/${formId}/records`,
    {
      cache: "no-cache",
      credentials: "include",
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
