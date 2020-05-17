import React from "react";
import useRecords from "../../containers/Records/Hooks/useRecords";
import RecordsOptions from "./RecordsOptions";
import RecordsList from "./RecordsList";
import { Empty, Col, Card } from "antd";

const Records = props => {
  const { resource } = props;
  const { recordFields, records, sortedRecords, values, loading } = useRecords(
    props
  );

  return (
    <Col span={24} order={24}>
      <Card>
        <RecordsOptions resource={resource} />
        {records.length > 0 ? (
          <RecordsList
            recordFields={recordFields.filter(f => f.formId === resource.id)}
            resource={resource}
            records={records}
            sortedRecords={sortedRecords.filter(f => f.formId === resource.id)}
            values={values.filter(f => f.formId === resource.id)}
            loading={loading}
          />
        ) : (
          <Empty description={"This resource doesn't have any records yet."} />
        )}
      </Card>
    </Col>
  );
};

export default React.memo(Records);
