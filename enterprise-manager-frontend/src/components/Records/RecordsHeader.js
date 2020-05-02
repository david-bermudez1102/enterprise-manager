import React, { PureComponent } from "react";
import Options from "../Options/Options";
import capitalize from "capitalize";

class RecordsHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  componentDidMount() {
    const { recordFields, resource, recordsSortedBy } = this.props;
    const currentRecordsSortedBy = recordsSortedBy.find(
      (r) => r.id === resource.id
    );
    this.setState({
      orders: currentRecordsSortedBy
        ? currentRecordsSortedBy.orders
        : [
            { recordFieldId: 0, ascendant: false, usedToSort: true },
            ...recordFields
              .filter((field) => field.formId === resource.id)
              .map((field) => {
                return {
                  recordFieldId: field.id,
                  ascendant: true,
                  usedToSort: false,
                };
              }),
          ],
    });
  }

  componentDidUpdate(prevProps) {
    const { recordFields, resource, recordsSortedBy } = this.props;
    const currentRecordsSortedBy = recordsSortedBy.find(
      (r) => r.id === resource.id
    );
    if (prevProps.recordFields !== recordFields)
      this.setState({
        orders: currentRecordsSortedBy
          ? currentRecordsSortedBy.orders
          : [
              { recordFieldId: 0, ascendant: false, usedToSort: true },
              ...recordFields
                .filter((field) => field.formId === resource.id)
                .map((field) => {
                  return {
                    recordFieldId: field.id,
                    ascendant: true,
                    usedToSort: false,
                  };
                }),
            ],
      });
  }

  handleSortBy = (fieldId) => {
    this.setState(
      {
        orders: [
          ...this.state.orders.map((order) =>
            order.recordFieldId === fieldId
              ? {
                  ...order,
                  ascendant: order.ascendant ? false : true,
                  usedToSort: true,
                }
              : { ...order, ascendant: true, usedToSort: false }
          ),
        ],
      },
      () => this.props.handleSortBy(fieldId, this.state.orders)
    );
  };

  render() {
    const {
      match,
      recordFields,
      resource,
      selectAllRecords,
      sortedRecords,
      filteredRecords,
      allChecked,
    } = this.props;
    const { orders } = this.state;
    const defaultOrder = orders.find((order) => order.recordFieldId === 0);
    return (
      <thead>
        <tr>
          <th
            className="text-nowrap"
            style={{ verticalAlign: "middle", width: "1%", maxWidth: "100%" }}>
            <div className="d-flex flex-nowrap align-items-center">
              <div className="check mr-2">
                <input
                  type="checkbox"
                  name={"selectedRecord"}
                  id={`select_all`}
                  onChange={() =>
                    selectAllRecords(filteredRecords || sortedRecords)
                  }
                  checked={allChecked}
                />
                <label
                  htmlFor={`select_all`}
                  className="d-flex flex-nowrap m-0 p-0 align-items-center">
                  <div className="box">
                    <i className="fas fa-check"></i>
                  </div>
                </label>
              </div>
              <span>Options</span>
            </div>
          </th>
          <th
            className="text-truncate"
            style={{ width: "1%", maxWidth: "100%" }}>
            <span className="d-flex w-100 align-items-center">
              <button
                className="btn btn-transparent px-0 pr-1 shadow-none text-primary"
                onClick={() => this.handleSortBy(0, orders)}>
                {defaultOrder && defaultOrder.usedToSort ? (
                  !defaultOrder.ascendant ? (
                    <i className="fad fa-sort-alt" title="Sort Ascendant"></i>
                  ) : (
                    <i
                      className="fad fa-sort-alt fa-swap-opacity"
                      title="Sort Descendant"></i>
                  )
                ) : (
                  <i className="fas fa-sort-alt" title="Sort Ascendant"></i>
                )}
              </button>
              #
            </span>
          </th>
          {recordFields.map((field) => {
            const order = orders.find(
              (order) => order.recordFieldId === field.id
            );
            return field.formId === resource.id ? (
              <th
                key={`record_field_head_${field.id}`}
                className="text-nowrap position-relative">
                <span className="d-flex w-100 align-items-center">
                  <button
                    className="btn btn-transparent px-0 pr-1 shadow-none text-primary"
                    onClick={() => this.handleSortBy(field.id, orders)}>
                    {order && order.usedToSort ? (
                      !order.ascendant ? (
                        <i
                          className="fad fa-sort-alt"
                          title="Sort Ascendant"></i>
                      ) : (
                        <i
                          className="fad fa-sort-alt fa-swap-opacity"
                          title="Sort Descendant"></i>
                      )
                    ) : (
                      <i className="fas fa-sort-alt" title="Sort Ascendant"></i>
                    )}
                  </button>
                  {capitalize(field.name)}
                  <Options
                    url={`${match.url}/record_fields`}
                    title={`Delete Field "${field.name}"?`}
                    content={field}
                    fontSize="14px"
                    deletionMessage="The entire column and all of it's data associated will be deleted."
                  />
                </span>
              </th>
            ) : null;
          })}
        </tr>
      </thead>
    );
  }
}

export default RecordsHeader;
