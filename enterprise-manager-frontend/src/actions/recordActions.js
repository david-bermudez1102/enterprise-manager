import workerInstance from "../workers/workerActions";
import { remove, update, add } from "./fetchActions";

export const addRecord = (record, organizationId, formId) => dispatch =>
  add(
    dispatch,
    `/api/v1/organizations/${organizationId}/forms/${formId}/records`,
    { record }
  )
    .then(resp => {
      dispatch({
        type: "ADD_RECORD",
        record: resp.attributes,
        formId,
      });
      dispatch({
        type: "UPDATE_RECORDS_COUNT",
        formId,
        recordsCount: resp.attributes.recordsCount,
      });
      return resp.links.values;
    })
    .then(value => dispatch({ type: "ADD_VALUE", value }));

export const fetchRecords = (organizationId, formId, offset) => {
  //const query = offset ? `?offset=${offset}` : "";
  return (dispatch, getState) => {
    const { records, values } = getState();
    return workerInstance
      .fetchRecords({ records, values }, formId, organizationId)
      .then(({ records, values }) => {
        dispatch({ type: "FETCH_RECORDS", records });
        dispatch({ type: "FETCH_VALUES", values });
      });
  };
};

export const setSortedRecords = (records, formId) => {
  return dispatch => dispatch({ type: "SET_SORTED_RECORDS", records, formId });
};

export const setRecordsSortedBy = resource => {
  return dispatch => dispatch({ type: "SET_SORTED_BY", resource });
};

export const removeRecord = (organizationId, formId, id) => {
  return dispatch =>
    remove(
      dispatch,
      `/api/v1/organizations/${organizationId}/forms/${formId}/records/${id}`,
      id,
      "REMOVE_RECORD",
      { type: "REMOVE_VALUES", recordId: id }
    ).then(resp =>
      dispatch({
        type: "UPDATE_RECORDS_COUNT",
        formId,
        recordsCount: resp.records_count,
      })
    );
};

export const updateRecord = value => {
  return dispatch =>
    update(
      dispatch,
      `/api/v1/organizations/${value.organizationId}/forms/${value.formId}/records/${value.recordId}`,
      value,
      { type: "UPDATE_VALUE", value }
    );
};
