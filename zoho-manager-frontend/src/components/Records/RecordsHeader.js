import React, { Component } from "react";
import cuid from "cuid";
import Options from "../Options/Options";

export default class RecordsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  componentDidUpdate(prevProps) {
    const { recordFields, resource } = this.props;
    if (prevProps.recordFields !== recordFields)
      this.setState({
        orders: recordFields
          .filter(field => field.formId === resource.id)
          .map(field => {
            return { recordFieldId: field.id, ascendant: true };
          })
      });
  }

  handleSortBy = fieldId => {
    this.setState({
      orders: [
        ...this.state.orders.map(order =>
          order.recordFieldId === fieldId
            ? { ...order, ascendant: order.ascendant ? false : true }
            : { ...order, ascendant: true }
        )
      ]
    });
    this.props.handleSortBy(fieldId, this.state.orders);
  };

  render() {
    const { match, recordFields, resource } = this.props;
    return (
      <thead>
        <tr>
          {recordFields.map(field => {
            return field.formId === resource.id ? (
              <th key={cuid()}>
                <span className="d-flex w-100 align-items-center">
                  <button
                    className="btn btn-transparent px-0 pr-1 shadow-none"
                    onClick={() => this.handleSortBy(field.id)}>
                    <i className="fas fa-sort"></i>
                  </button>
                  <Options
                    url={`${match.url}/record_fields`}
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
