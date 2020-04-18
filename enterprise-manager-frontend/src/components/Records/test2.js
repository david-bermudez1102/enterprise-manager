import React, { Component } from "react";
import Record from "./Record";
import cuid from "cuid";
import RecordsHeader from "./RecordsHeader";
import { connect } from "react-redux";
import Pagination from "../Pagination";
import { chunk } from "lodash";
import {
  setRecordsSortedBy,
  setSortedRecords
} from "../../actions/recordActions";
import { addInfoAlert } from "../../actions/alertsActions";

class RecordsList extends Component {
  constructor(props) {
    super(props);
    const location = props.history.location;
    const queryParams = new URLSearchParams(location.search);
    const page =
      parseInt(queryParams.get("page")) >
      Math.ceil(props.resource.recordsCount / props.pagination.limit)
        ? 1
        : parseInt(queryParams.get("page"));

    const recordsSortedBy = props.recordsSortedBy.find(
      resource => resource.id === props.resource.id
    );

    this.recordsOptions = React.createRef();

    this.state = {
      sortBy: recordsSortedBy ? recordsSortedBy.recordFieldId : 0,
      count: 0,
      page: page || 1,
      scrolled: false
    };
  }

  componentDidMount() {
    const { sortBy } = this.state;
    const { sortedRecords, records, values } = this.props;
    if (sortedRecords.length === 0) this.sortBy(sortBy, records, values, true);
  }

  componentDidUpdate(prevProps) {
    const { pagination, history, sortedRecords } = this.props;

    if (prevProps.pagination.limit !== this.props.pagination.limit) {
      this.setState({ scrolled: false });
      const currentValue = chunk(sortedRecords, prevProps.pagination.limit)[
        this.state.page - 1
      ][0];
      this.setState(
        {
          page:
            chunk(sortedRecords, pagination.limit).findIndex(e =>
              e.includes(currentValue)
            ) + 1
        },
        () =>
          history.replace(
            `${history.location.pathname}?page=${this.state.page}`
          )
      );
    }
    if (!this.state.scrolled) {
      this.recordsOptions.current.scrollIntoView();
      this.setState({ scrolled: true });
    }
  }

  handleSortBy = (recordFieldId, orders) => {
    const order = orders.find(order => order.recordFieldId === recordFieldId);
    this.sortBy(
      recordFieldId,
      this.props.records,
      this.props.values,
      order ? order.ascendant : false
    );
    this.props.setRecordsSortedBy({
      id: this.props.resource.id,
      recordFieldId,
      orders
    });
  };

  sortBy = (recordFieldId, records, values, ascendant) => {
    const { setSortedRecords, resource, addInfoAlert } = this.props;
    if (recordFieldId !== 0) {
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
        setSortedRecords(
          ascendant ? sortedRecords : sortedRecords.reverse(),
          resource.id
        );
      } else {
        addInfoAlert([
          "This column has no values. Using default column (#) to sort table."
        ]);
      }
    } else {
      setSortedRecords(
        ascendant ? [...records] : [...records].reverse(),
        resource.id
      );
    }
  };

  render() {
    const {
      sortedRecords,
      pagination,
      recordFields,
      resource,
      values
    } = this.props;
    const { page } = this.state;
    const chunkOfRecords = chunk(sortedRecords, pagination.limit)[page - 1];
    return (
      <div ref={this.recordsOptions} className="table-responsive">
        <Pagination resource={resource} page={page} />
        <table className="table table-sm mb-0 table-hover border-0">
          <RecordsHeader {...this.props} handleSortBy={this.handleSortBy} />
          <tbody>
            {chunkOfRecords
              ? chunkOfRecords.map(record =>
                  record.formId === resource.id ? (
                    <Record
                      key={cuid()}
                      record={record}
                      recordFields={recordFields}
                      resourceId={resource.id}
                      values={values}
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

const mapStateToProps = ({ pagination, recordsSortedBy }) => {
  return { pagination, recordsSortedBy };
};

export default connect(mapStateToProps, {
  setRecordsSortedBy,
  addInfoAlert,
  setSortedRecords
})(RecordsList);
