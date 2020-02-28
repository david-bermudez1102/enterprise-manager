import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";

class SelectableOptions extends Component {

  constructor(){
    super()
    this.state = { selected: "select" }
  }

  handleChange = event => {
    this.setState({ selected: event.target.value })
  }

  render() {
    const { resources, fields } = this.props;
    console.log(fields)
    return (
      <div>
        Connect to:
        <select onChange={this.handleChange} value={this.state.selected}>
          <option value="Select" key={cuid()}>
            Select
          </option>
          {resources.map(resource => (
            <option value={resource.id} key={cuid()}>
              {resource.name}
            </option>
          ))}
        </select>
        <select>
          {resources.map(resource => (
            <option value={resource.id} key={cuid()}>
              {resource.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({resources, fields}) => {
  return { resources, fields };
};

export default connect(mapStateToProps)(SelectableOptions);
