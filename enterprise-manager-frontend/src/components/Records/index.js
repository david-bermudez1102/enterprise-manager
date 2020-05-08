import React from "react";
import useRecords from "../../containers/Records/Hooks/useRecords";
import { ReactHeight } from "react-height/lib/ReactHeight";
import RecordsOptions from "./RecordsOptions";
import RecordsList from "./RecordsList";
import { Empty } from "antd";
import Loader from "../Loader";

const Records = props => {
  const { resource } = props;
  const {
    recordFields,
    records,
    sortedRecords,
    values,
    listHeight,
    setListHeight,
    optionsHeight,
    setOptionsHeight,
    loading,
  } = useRecords(props);
  console.log(records);
  return (
    <div
      className="col-lg-12 pt-4 d-block float-left position-relative"
      style={{
        height: `${listHeight + optionsHeight + 50}px`,
      }}>
      <div className="w-100 position-relative">
        <Loader loading={loading} />
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
                records={records}
                sortedRecords={sortedRecords.filter(
                  f => f.formId === resource.id
                )}
                values={values.filter(f => f.formId === resource.id)}
                loading={loading}
              />
            </ReactHeight>
          ) : (
            <ReactHeight onHeightReady={height => setListHeight(height)}>
              <Empty
                description={"This resource doesn't have any records yet."}
              />
            </ReactHeight>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Records);
