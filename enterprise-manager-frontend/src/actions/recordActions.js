import workerInstance from "../workers/workerActions"
import { remove, update, add } from "./fetchActions"
import { message } from "antd"
import { handleErrors } from "./handleErrors"

export const addRecord = (record, organizationId, formId) => dispatch =>
  add(
    dispatch,
    `/api/v1/organizations/${organizationId}/forms/${formId}/records`,
    { record }
  ).then(resp => {
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
  })

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

export const updateRecord = value => {
  return dispatch =>
    update(
      dispatch,
      `/api/v1/organizations/${value.organizationId}/forms/${value.formId}/records/${value.recordId}`,
      value,
      { type: "UPDATE_VALUE", value }
    )
}

export const searchRecords = (organizationId, formId, query) => dispatch =>
  fetch(
    `/api/v1/organizations/${organizationId}/forms/${formId}/records?query=${query}`,
    {
      credentials: "include"
    }
  )
    .then(handleErrors)
    .then(resp => resp.json())
    .catch(console.log)
