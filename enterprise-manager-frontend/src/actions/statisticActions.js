import { handleErrors } from "./handleErrors"

export const fetchStatistics = (resource, queryParams) => dispatch =>
  fetch(
    `/api/v1/organizations/${resource.organizationId}/forms/${resource.id}/statistics?${queryParams}`,
    { credentials: "include" }
  )
    .then(handleErrors)
    .then(payload =>
      dispatch({ type: "SET-STATISTICS", payload, formId: resource.id })
    )
    .catch(console.log)
