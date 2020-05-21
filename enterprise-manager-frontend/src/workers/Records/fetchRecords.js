import { normalize, normalizeWithFilters } from "../normalizeData"
import { handleErrors } from "../../actions/handleErrors"

export const fetchRecords = (
  state,
  formId,
  organizationId,
  deleted,
  withDateFilters,
  queryParams
) => {
  const transform = withDateFilters ? normalizeWithFilters : normalize
  return fetch(
    `http://localhost:3000/api/v1/organizations/${organizationId}/forms/${formId}/records?${
      queryParams || "current_month=true"
    }${deleted ? `&deleted=true` : ""}`,
    {
      credentials: "include",
      mode: "same-origin"
    }
  )
    .then(handleErrors)
    .then(response => response.json())
    .then(response => {
      const records = transform(
        state.records,
        response.map(r => r.attributes),
        formId
      )
      const values = transform(
        state.values,
        response.map(r => ({
          id: r.id,
          formId: r.attributes.formId,
          ...r.links.values,
          key: `recordValues${r.id}`
        })),
        formId
      )
      return { records, values }
    })
}
