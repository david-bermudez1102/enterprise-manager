import React, { Component } from "react";
import FileUploader from "../Uploader/FileUploader";
import AvatarUploader from "../Uploader/AvatarUploader";
import snakecaseKeys from "snakecase-keys";
import { Form, Divider, Input, Select, Button } from "antd";

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = props;
    const avatar = currentUser.avatar ? currentUser.avatar : null;
    this.state = {
      avatar: undefined,
      name: currentUser.name,
      email: currentUser.email,
      gender: "Select",
      avatarMarginLeft: avatar ? avatar.margin_left : 0,
      avatarMarginTop: avatar ? avatar.margin_top : 0,
      avatarUrl: avatar ? `http://localhost:3001${avatar.url}` : "",
    };
  }

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAvatarChange = file => {
    this.setState({
      avatar: file,
    });
  };

  handleAvatarCoordinates = (x, y) => {
    this.setState({
      avatarMarginLeft: x,
      avatarMarginTop: y,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { updateAdmin, currentUser } = this.props;
    const {
      avatar,
      name,
      email,
      gender,
      avatarMarginLeft,
      avatarMarginTop,
    } = this.state;
    const formData = {
      avatar,
      ...snakecaseKeys({
        name,
        email,
        gender,
        avatarMarginLeft,
        avatarMarginTop,
      }),
    };
    updateAdmin(formData, currentUser.id);
  };

  render() {
    const {
      avatarUrl,
      name,
      email,
      gender,
      avatarMarginLeft,
      avatarMarginTop,
    } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        layout={"vertical"}
        initialValues={{ name, email, gender }}>
        <div
          className="d-flex display-4 mb-0 align-items-center"
          style={{ fontSize: "40px" }}>
          <FileUploader
            className="circular--landscape shadow bg-light mr-2"
            size="150px"
            filePreview={avatarUrl}
            handleChange={this.handleAvatarChange}>
            <AvatarUploader
              x={avatarMarginLeft}
              y={avatarMarginTop}
              handleCoordinates={this.handleAvatarCoordinates}
              title={name}
            />
          </FileUploader>
          <span>{name}</span>
        </div>
        <Divider />
        <Form.Item name="name" label={"Your Name"}>
          <Input
            id="account_name"
            onChange={this.handleChange}
            placeholder="Enter name..."
          />
        </Form.Item>
        <Form.Item name="email" label={"Your Email"}>
          <Input id="account_email" onChange={this.handleChange} />
        </Form.Item>
        <Form.Item name="gender" label={"Gender"}>
          <Select id="account_gender" onChange={this.handleChange}></Select>
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default ProfileForm;
