import React, { Component } from "react";

export default class Uploader extends Component {
  state = { file: "", filePreview: "" };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.addOrganization(this.state);
  };

  handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleChange = event => {
    URL.revokeObjectURL(this.state.filePreview);
    this.setState({
      [event.target.name]: event.target.files[0],
      filePreview: URL.createObjectURL(event.target.files[0])
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <label className="circular--landscape" onDragEnter={this.handleDragEnter}>
            <img src={this.state.filePreview} />
            <input type="file" name="file" onChange={this.handleChange} />
          </label>
        </form>
      </div>
    );
  }
}
