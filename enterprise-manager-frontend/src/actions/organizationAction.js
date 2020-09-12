import jsonToFormData from "json-form-data"
import { update, getAll } from "./fetchActions"
import { handleErrors } from "./handleErrors"

export const addOrganization = organization => {
	return dispatch => {
		dispatch({ type: "REQUESTING_DATA" })
		return fetch("/api/v1/organizations", {
			method: "POST",
			body: jsonToFormData({ organization })
		})
			.then(handleErrors)
			.then(organization => organization.data.attributes)
			.then(organization =>
				dispatch({ type: "ADD_ORGANIZATION", organization })
			)
			.then(() => dispatch({ type: "FINISHED_REQUESTING" }))
	}
}

export const fetchOrganizations = () => dispatch =>
	getAll(dispatch, "/api/v1/organizations", organizations =>
		dispatch({ type: "FETCH_ORGANIZATIONS", organizations })
	)

export const updateOrganization = organization => {
	return dispatch =>
		update(
			dispatch,
			`/api/v1/organizations/${organization.id}`,
			{ organization },
			organization =>
				dispatch({
					type: "UPDATE_ORGANIZATION",
					organization
				})
		)
}
