import React, { Component } from "react";
import DragDrop from "./DragDrop";

export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", filePreview: props.filePreview || "" };
  }

  handleDrop = file => {
    URL.revokeObjectURL(this.state.filePreview);
    this.setState(
      {
        file,
        filePreview: URL.createObjectURL(file)
      },
      () => this.props.handleChange(this.state.file)
    );
  };

  handleChange = event => {
    URL.revokeObjectURL(this.state.filePreview);
    if (event.target.files.length > 0)
      this.setState(
        {
          [event.target.name]: event.target.files[0],
          filePreview: URL.createObjectURL(event.target.files[0])
        },
        () => this.props.handleChange(this.state.file)
      );
  };

  render() {
    const { size, className, children } = this.props;
    return (
      <DragDrop handleDrop={this.handleDrop}>
        <label className={className} style={{ width: size, height: size }}>
          {React.cloneElement(children, { ...this.state })}
          <input type="file" name="file" className="d-none" onChange={this.handleChange} />
        </label>
      </DragDrop>
    );
  }
}
