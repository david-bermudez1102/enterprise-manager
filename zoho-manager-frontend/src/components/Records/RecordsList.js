import React, { Component } from "react";
import Record from "./Record";
import cuid from "cuid";
import RecordsHeader from "./RecordsHeader";

class RecordsList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { sortBy: "default", sortedRecords: [], orders: [] };
  }

  componentDidMount() {
    const { values, records } = this.props;
    const RecordsList = this.myRef.current.getBoundingClientRect();
    window.scrollTo(RecordsList.x, RecordsList.y);
    this.setState({
      sortedRecords: this.sortBy("default", records, values, false)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { values, records } = this.props;
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
  }

  handleSortBy = (recordFieldId, orders) => {
    this.setState({ sortBy: recordFieldId, orders: orders });
  };

  sortBy = (recordFieldId, records, values, ascendant) => {
    if (recordFieldId !== "default") {
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
    const { records, recordFields, resource, values } = this.props;
    const { sortedRecords } = this.state;
    console.log(this.state);
    return (
      <table ref={this.myRef} className="table table-striped table-sm w-100">
        <RecordsHeader {...this.props} handleSortBy={this.handleSortBy} />
        <tbody>
          {sortedRecords && sortedRecords.length > 0
            ? sortedRecords.map(record =>
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
    );
  }
}
export default RecordsList;
