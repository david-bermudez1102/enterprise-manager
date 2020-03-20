import React, { Component } from "react";
import FileUploader from "../Uploader/FileUploader";
import AvatarUploader from "../Uploader/AvatarUploader";
import snakecaseKeys from "snakecase-keys";

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
      avatarUrl: avatar ? `http://localhost:3001${avatar.url}` : ""
    };
  }

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleAvatarChange = file => {
    this.setState({
      avatar: file
    });
  };

  handleAvatarCoordinates = (x, y) => {
    this.setState({
      avatarMarginLeft: x,
      avatarMarginTop: y
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { updateAdmin, currentUser } = this.props;
    const { avatar, name, email, gender, avatarMarginLeft, avatarMarginTop } = this.state;
    const formData = {
      avatar,
      ...snakecaseKeys({ name, email, gender, avatarMarginLeft, avatarMarginTop })
    };
    updateAdmin(formData, currentUser.id);
  };

  render() {
    const { avatarUrl, name, email, gender, avatarMarginLeft, avatarMarginTop } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <FileUploader
            className="circular--landscape shadow bg-light"
            size="150px"
            filePreview={avatarUrl}
            handleChange={this.handleAvatarChange}>
            <AvatarUploader
              x={avatarMarginLeft}
              y={avatarMarginTop}
              handleCoordinates={this.handleAvatarCoordinates}
            />
          </FileUploader>
        </div>
        <div className="form-group">
          <label htmlFor="account_name">Your Name:</label>
          <input
            type="text"
            name="name"
            id="account_name"
            className="form-control rounded-pill"
            onChange={this.handleChange}
            value={name}
            placeholder="Enter name..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="account_email">Your Email:</label>
          <input
            type="text"
            name="email"
            id="account_email"
            className="form-control rounded-pill"
            onChange={this.handleChange}
            value={email}
            placeholder="Enter email..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="account_gender">Gender:</label>
          <select
            type="text"
            name="gender"
            id="account_gender"
            className="form-control rounded-pill"
            onChange={this.handleChange}
            value={gender}
            placeholder="Enter email..."></select>
        </div>
        <hr />
        <input type="submit" className="btn btn-primary shadow" value="Save Changes" />
      </form>
    );
  }
}
export default ProfileForm;
