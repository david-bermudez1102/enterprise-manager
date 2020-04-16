import React, { Component } from "react";
import cuid from "cuid";
import Options from "../Options/Options";
import capitalize from "capitalize";

class RecordsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  componentDidMount() {
    const { recordFields, resource, recordsSortedBy } = this.props;
    const currentRecordsSortedBy = recordsSortedBy.find(
      r => r.id === resource.id
    );
    this.setState({
      orders: currentRecordsSortedBy
        ? currentRecordsSortedBy.orders
        : [
            { recordFieldId: 0, ascendant: true, usedToSort: true },
            ...recordFields
              .filter(field => field.formId === resource.id)
              .map(field => {
                return {
                  recordFieldId: field.id,
                  ascendant: true,
                  usedToSort: false
                };
              })
          ]
    });
  }

  componentDidUpdate(prevProps) {
    const { recordFields, resource, recordsSortedBy } = this.props;
    const currentRecordsSortedBy = recordsSortedBy.find(
      r => r.id === resource.id
    );
    if (prevProps.recordFields !== recordFields)
      this.setState({
        orders: currentRecordsSortedBy
          ? currentRecordsSortedBy.orders
          : [
              { recordFieldId: 0, ascendant: true, usedToSort: true },
              ...recordFields
                .filter(field => field.formId === resource.id)
                .map(field => {
                  return {
                    recordFieldId: field.id,
                    ascendant: true,
                    usedToSort: false
                  };
                })
            ]
      });
  }

  handleSortBy = fieldId => {
    this.setState(
      {
        orders: [
          ...this.state.orders.map(order =>
            order.recordFieldId === fieldId
              ? {
                  ...order,
                  ascendant: order.ascendant ? false : true,
                  usedToSort: true
                }
              : { ...order, ascendant: true, usedToSort: false }
          )
        ]
      },
      () => this.props.handleSortBy(fieldId, this.state.orders)
    );
  };

  render() {
    const { match, recordFields, resource } = this.props;
    const { orders } = this.state;
    const defaultOrder = orders.find(order => order.recordFieldId === 0);
    return (
      <thead>
        <tr>
          <th
            key={cuid()}
            className="w-auto text-truncate"
            style={{ maxWidth: "30px" }}>
            <span className="d-flex w-100 align-items-center">
              <button
                className="btn btn-transparent px-0 pr-1 shadow-none text-primary"
                onClick={() => this.handleSortBy(0)}>
                {defaultOrder && defaultOrder.usedToSort ? (
                  !defaultOrder.ascendant ? (
                    <i
                      className="fad fa-sort fa-swap-opacity"
                      title="Sort Ascendant"></i>
                  ) : (
                    <i className="fad fa-sort" title="Sort Descendant"></i>
                  )
                ) : (
                  <i className="fas fa-sort" title="Sort Ascendant"></i>
                )}
              </button>
              #
            </span>
          </th>
          {recordFields.map(field => {
            const order = orders.find(
              order => order.recordFieldId === field.id
            );
            return field.formId === resource.id ? (
              <th key={cuid()} className="text-nowrap position-relative">
                <span className="d-flex w-100 align-items-center">
                  <button
                    className="btn btn-transparent px-0 pr-1 shadow-none text-primary"
                    onClick={() => this.handleSortBy(field.id)}>
                    {order && order.usedToSort ? (
                      !order.ascendant ? (
                        <i
                          className="fad fa-sort fa-swap-opacity"
                          title="Sort Ascendant"></i>
                      ) : (
                        <i className="fad fa-sort" title="Sort Descendant"></i>
                      )
                    ) : (
                      <i className="fas fa-sort" title="Sort Ascendant"></i>
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
