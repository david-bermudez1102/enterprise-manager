import workerInstance from "../workers/workerActions"
import { remove, update, add, getOne } from "./fetchActions"
import { message } from "antd"
import { handleErrors } from "./handleErrors"
import snakecaseKeys from "snakecase-keys"

export const addRecord = (record, organizationId, formId) => dispatch =>
  add(
    dispatch,
    `/api/v1/organizations/${organizationId}/forms/${formId}/records`,
    { record },
    resp => {
      dispatch({
        type: "ADD_RECORD",
        record: resp.attributes,
        formId
      })
      dispatch({
        type: "ADD_VALUES",
        values: {
          ...resp.links.values,
          listingId: resp.attributes.currentMonthRecordsCount,
          key: `recordValues${resp.id}`
        },
        formId
      })
      dispatch({
        type: "UPDATE_RECORDS_COUNT",
        formId,
        recordsCount: resp.attributes.recordsCount
      })
      return true
    }
  )

/* export const fetchRecords = (
  organizationId,
  formId,
  deleted,
  withDateFilters,
  queryParams
) => dispatch =>
  getAll(
    dispatch,
    `/api/v1/organizations/${organizationId}/forms/${formId}/records?${
      queryParams || "current_month=true"
    }${deleted ? `&deleted=true` : ""}`,
    values => {
      dispatch({ type: "FETCH_RECORDS", records: values, formId })
      dispatch({ type: "FETCH_VALUES", values, formId })

      dispatch({ type: "REMOVE_ARCHIVED_SORTED_BY", formId })
      return values
    }
  ) */

export const fetchRecords = (
  organizationId,
  formId,
  deleted,
  withDateFilters,
  queryParams
) => {
  return (dispatch, getState) => {
    const { records, values, archivedRecords, archivedValues } = getState()
    return workerInstance
      .fetchRecords(
        !deleted
          ? { records, values }
          : { records: archivedRecords, values: archivedValues },
        formId,
        organizationId,
        deleted,
        withDateFilters,
        queryParams
      )
      .then(({ records, values }) => {
        if (deleted) {
          dispatch({ type: "FETCH_ARCHIVED_RECORDS", records })
          dispatch({ type: "FETCH_ARCHIVED_VALUES", values })
          dispatch({ type: "REMOVE_ARCHIVED_SORTED_BY", formId })
        } else {
          dispatch({ type: "FETCH_RECORDS", records })
          dispatch({ type: "FETCH_VALUES", values })
          dispatch({ type: "REMOVE_SORTED_BY", formId })
        }
        return values[formId]
      })
      .catch(err => message.error(err.message))
  }
}

export const setSortedRecords = (records, formId, deleted) => {
  return dispatch =>
    dispatch({
      type: !deleted ? "SET_SORTED_RECORDS" : "SET_SORTED_ARCHIVED_RECORDS",
      records,
      formId
    })
}

export const setRecordsSortedBy = (resource, deleted) => {
  return dispatch =>
    dispatch({
      type: !deleted ? "SET_SORTED_BY" : "SET_ARCHIVED_SORTED_BY",
      resource
    })
}

export const removeRecord = (organizationId, formId, id) => {
  return dispatch =>
    remove(
      dispatch,
      `/api/v1/organizations/${organizationId}/forms/${formId}/records/${id}`,
      id,
      { type: "REMOVE_VALUES", recordId: id, formId }
    ).then(resp => {
      dispatch({
        type: "REMOVE_RECORD",
        id,
        formId
      })
      if (resp.archived) {
        dispatch({
          type: "ADD_ARCHIVED_RECORD",
          record: resp.attributes,
          formId
        })
        dispatch({
          type: "ADD_ARCHIVED_VALUES",
          values: resp.links.values,
          formId
        })
      }
      return dispatch({
        type: "UPDATE_RECORDS_COUNT",
        formId,
        recordsCount: resp.records_count
      })
    })
}

/* export const updateRecord = value => dispatch =>
  update(
    dispatch,
    `/api/v1/organizations/${value.organizationId}/forms/${value.formId}/records/${value.recordId}`,
    value,
    resp => {
      dispatch({
        type: "UPDATE_VALUE",
        value: resp.links.values
      })
    }
  ) */

export const updateRecord = value => dispatch => {
  dispatch({ type: "IS_SAVING" })
  return fetch(
    `/api/v1/organizations/${value.organizationId}/forms/${value.formId}/records/${value.recordId}`,
    {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(snakecaseKeys(value, { exclude: ["_destroy"] }))
    }
  )
    .then(handleErrors)
    .then(resp => {
      dispatch({
        type: "UPDATE_VALUE",
        value: resp.links.values
      })
      return dispatch({ type: "FINISHED_SAVING" })
    })
    .catch(console.log)
}

export const getRecord = record => dispatch =>
  getOne(
    `/api/v1/organizations/${record.organizationId}/forms/${record.formId}/records/${record.recordId}`
  )

export const searchRecords = (organizationId, formId, query) => dispatch =>
  fetch(
    `/api/v1/organizations/${organizationId}/forms/${formId}/records?query=${query}`,
    {
      credentials: "include"
    }
  )
    .then(handleErrors)

    .catch(console.log)
