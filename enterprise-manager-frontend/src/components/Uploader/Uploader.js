import React, { Component } from "react";
import defaultAvatar from "../../default_user.png";
import DragDrop from "./DragDrop";
import Draggable from "./Draggable";

export default class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: "", filePreview: props.file || "" };
  }

  handleDrop = file => {
    URL.revokeObjectURL(this.state.filePreview);
    this.setState({
      file,
      filePreview: URL.createObjectURL(file)
    });
  };

  handleChange = event => {
    URL.revokeObjectURL(this.state.filePreview);
    if (event.target.files.length > 0)
      this.setState({
        [event.target.name]: event.target.files[0],
        filePreview: URL.createObjectURL(event.target.files[0])
      });
  };

  render() {
    const { size } = this.props;
    return (
      <DragDrop handleDrop={this.handleDrop}>
        <label className="circular--landscape shadow" style={{ width: size, height: size }}>
          {this.state.filePreview !== "" ? (
            <Draggable>
              <img src={this.state.filePreview} />
            </Draggable>
          ) : (
            <img src={defaultAvatar} width="100%" />
          )}
          <input type="file" name="file" className="d-none" onChange={this.handleChange} />
        </label>
      </DragDrop>
    );
  }
}
