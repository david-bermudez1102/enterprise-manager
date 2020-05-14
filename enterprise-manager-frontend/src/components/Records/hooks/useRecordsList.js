import { useState, useCallback, useEffect } from "react";
import capitalize from "capitalize";
import ResizeableTitle from "../ResizableTitle";
import RecordCell from "../RecordCell";
import workerInstance from "../../../workers/workerActions";

export const useRecordsList = ({ recordFields, values, resource }) => {
  const [state, setState] = useState({ columns: [] });

  useEffect(() => {
    setState({
      columns: recordFields.map((field, index) => ({
        key: `record_field_head_${field.id}`,
        title: capitalize(field.name),
        dataIndex: field.id,
        sorter: true,
        filters: [],
        width: index < recordFields.length - 1 ? 200 : undefined,
        wordWrap: "break-word",
        editable: true,
      })),
    });
  }, [recordFields, resource]);

  useEffect(() => {
    Promise.all(
      state.columns.map(col =>
        workerInstance.filters(values, col.dataIndex).then(filters => ({
          ...col,
          filters,
          onFilter: (value, record) =>
            record[col.dataIndex].indexOf(value) === 0,
        }))
      )
    ).then(cols => setState({ columns: cols }));
  }, [values]);

  const components = {
    header: {
      cell: ResizeableTitle,
    },
    body: {
      cell: RecordCell,
    },
  };

  const handleResize = useCallback(
    index => (e, { size }) => {
      const nextColumns = [...state.columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      setState({ columns: nextColumns });
    },
    []
  );

  const columns = state.columns.map((col, index) => {
    return {
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: handleResize(index),
      }),
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        organizationId: resource.organizationId,
      }),
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return { components, columns, rowSelection };
};
