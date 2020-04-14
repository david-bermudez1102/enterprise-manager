import React, { Component } from "react";
import Record from "./Record";
import cuid from "cuid";
import RecordsHeader from "./RecordsHeader";
import { connect } from "react-redux";
import Pagination from "../Pagination";
import { chunk } from "lodash";

class RecordsList extends Component {
  constructor(props) {
    super(props);
    const location = props.history.location;
    const queryParams = new URLSearchParams(location.search);
    const page =
      parseInt(queryParams.get("page")) >
      Math.ceil(props.resource.recordsCount / props.pagination.limit)
        ? 0
        : parseInt(queryParams.get("page"));

    this.recordsOptions = React.createRef();
    this.state = {
      sortBy: 0,
      sortedRecords: [],
      orders: [],
      count: 0,
      page: page || 1,
      scrolled: false
    };
  }

  componentDidMount() {
    const { values, records } = this.props;
    this.setState({
      sortedRecords: this.sortBy(this.state.sortBy, records, values, false)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { values, records, pagination } = this.props;
    const { sortBy, orders } = this.state;
    if (
      prevProps.values !== values ||
      prevState.sortBy !== sortBy ||
      prevState.orders !== orders
    ) {
      const order = orders.find(order => order.recordFieldId === sortBy);
      this.setState({
        sortedRecords: this.sortBy(
          sortBy,
          records,
          values,
          order ? order.ascendant : false
        )
      });
    }

    if (
      prevProps.pagination.limit !== pagination.limit &&
      this.state.page > 1
    ) {
      const currentValue = chunk(
        this.state.sortedRecords,
        prevProps.pagination.limit
      )[this.state.page - 1][0];

      this.setState({
        page:
          chunk(this.state.sortedRecords, pagination.limit).findIndex(e =>
            e.includes(currentValue)
          ) + 1
      });
    }
    if (!this.state.scrolled) {
      this.recordsOptions.current.scrollIntoView();
      this.setState({ scrolled: true });
    }
  }

  handleSortBy = (recordFieldId, orders) => {
    this.setState({ sortBy: recordFieldId, orders: orders });
  };

  sortBy = (recordFieldId, records, values, ascendant) => {
    if (recordFieldId !== 0) {
      const { resource } = this.props;

      const sortedValues = [...values]
        .filter(value => value.recordFieldId === recordFieldId)
        .sort((value, memo) => {
          const valueA = value.content ? value.content.toUpperCase() : ""; // ignore upper and lowercase
          const valueB = memo.content ? memo.content.toUpperCase() : ""; // ignore upper and lowercase
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        });

      if (sortedValues.length > 0) {
        const sortedRecords = records
          .filter(record => record.formId === resource.id)
          .sort((rec, memo) => {
            const x = sortedValues.find(value => value.recordId === rec.id);
            const y = sortedValues.find(value => value.recordId === memo.id);
            const valueA = x && x.content ? x.content.toUpperCase() : ""; // ignore upper and lowercase
            const valueB = y && y.content ? y.content.toUpperCase() : "";
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
          });
        return ascendant ? sortedRecords : sortedRecords.reverse();
      }
    } else {
      return ascendant ? [...records] : [...records].reverse();
    }
  };

  render() {
    const { records, pagination, recordFields, resource, values } = this.props;
    const { sortedRecords, page } = this.state;

    return (
      <div ref={this.recordsOptions}>
        <Pagination resource={resource} page={page} />
        <table className="table table-sm mb-0 table-hover border-0">
          <RecordsHeader {...this.props} handleSortBy={this.handleSortBy} />
          <tbody>
            {sortedRecords && sortedRecords.length > 0
              ? chunk(sortedRecords, pagination.limit)[page - 1].map(record =>
                  record.formId === resource.id ? (
                    <Record
                      key={cuid()}
                      record={record}
                      recordFields={recordFields}
                      resourceId={resource.id}
                      values={values}
                      records={records}
                    />
                  ) : null
                )
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ pagination }) => {
  return { pagination };
};
export default connect(mapStateToProps)(RecordsList);
