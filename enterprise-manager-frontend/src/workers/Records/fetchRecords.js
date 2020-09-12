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
		`${
			process.env.PUBLIC_URL || "http://localhost:3001"
		}/api/v1/organizations/${organizationId}/forms/${formId}/records?${
			queryParams || "current_month=true"
		}${deleted ? `&deleted=true` : ""}`,
		{
			cache: "reload",
			credentials: "include"
		}
	)
		.then(handleErrors)
		.then(response => {
			const records = transform(state.records, response, formId)
			const values = transform(state.values, response, formId)
			return { records, values }
		})
}
