import React from "react";
import useRecords from "../../containers/Records/Hooks/useRecords";
import { ReactHeight } from "react-height/lib/ReactHeight";
import RecordsOptions from "./RecordsOptions";
import RecordsList from "./RecordsList";
import { Empty, Col, Card } from "antd";

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

  return (
    <Col
      span={24}
      order={24}
      style={{
        height: `${listHeight + optionsHeight + 50}px`,
      }}>
      <Card>
        <ReactHeight onHeightReady={height => setOptionsHeight(height)}>
          <RecordsOptions resource={resource} />
        </ReactHeight>
        {records.length > 0 ? (
          <ReactHeight onHeightReady={height => setListHeight(height)}>
            <RecordsList
              recordFields={recordFields.filter(f => f.formId === resource.id)}
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
      </Card>
    </Col>
  );
};

export default React.memo(Records);
