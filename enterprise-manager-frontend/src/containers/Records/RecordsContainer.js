import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import RecordsList from "../../components/Records/RecordsList";
import RecordFieldDelete from "../../components/Records/RecordFieldDelete";
import { removeRecordField } from "../../actions/recordFieldActions";
import { NoContent } from "../../components/NoContent";
import RecordsOptions from "../../components/Records/RecordsOptions";
import ReactHeight from "react-height";
import { fetchRecords } from "../../actions/recordActions";

const RecordsContainer = props => {
  const { resource, match } = props;
  const { recordFields, records, sortedRecords, values } = useSelector(
    state => state
  );
  const dispatch = useDispatch();

  const [listHeight, setListHeight] = useState();
  const [optionsHeight, setOptionsHeight] = useState();

  useEffect(() => {
    /* const lastRecord = Math.max(
      ...records.filter(record => record.formId === resource.id).map(r => r.id),
      0
    ); // return the most recent record */
    dispatch(fetchRecords(resource.organizationId, resource.id));
  }, [dispatch, resource.organizationId, resource.id]);

  return (
    <Switch>
      <Route
        path={`${match.path}/record_fields/:recordFieldId/delete`}
        render={props => (
          <RecordFieldDelete
            {...props}
            redirectTo={`${match.url}/records`}
            organizationId={resource.organizationId}
            resourceId={resource.id}
            removeRecordField={() => dispatch(removeRecordField)}
          />
        )}
      />
      <Route
        path={`${match.path}/records`}
        render={props => (
          <div
            className="col-lg-12 pt-4 d-block float-left position-relative"
            style={{
              height: `${listHeight + optionsHeight + 50}px`
            }}>
            <div className="w-100 position-relative">
              <div className="bg-white shadow-sm p-2 d-inline-block rounded w-100 position-absolute">
                <ReactHeight onHeightReady={height => setOptionsHeight(height)}>
                  <RecordsOptions resource={resource} />
                </ReactHeight>
                {records.length > 0 ? (
                  <ReactHeight onHeightReady={height => setListHeight(height)}>
                    <RecordsList
                      recordFields={recordFields.filter(
                        f => f.formId === resource.id
                      )}
                      resource={resource}
                      records={records.filter(f => f.formId === resource.id)}
                      sortedRecords={sortedRecords.filter(
                        f => f.formId === resource.id
                      )}
                      values={values.filter(f => f.formId === resource.id)}
                    />
                  </ReactHeight>
                ) : (
                  <ReactHeight onHeightReady={height => setListHeight(height)}>
                    <NoContent>
                      This resource doesn't have any records yet.
                    </NoContent>
                  </ReactHeight>
                )}
              </div>
            </div>
          </div>
        )}
      />
    </Switch>
  );
};

export default RecordsContainer;
