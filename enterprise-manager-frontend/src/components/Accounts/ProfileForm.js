import React, { Component } from "react";
import cuid from "cuid";

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = props;
    this.state = {
      avatar: currentUser.avatar || "",
      name: currentUser.name,
      email: currentUser.email,
      gender: "Select"
    };
  }

  handleChange = event => {
    event.persist();
    this.setState({
      account: {
        ...this.state.account,
        [event.target.name]: event.target.value
      },
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { avatar, name, email, gender } = this.state;
    console.log(avatar);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="file"
            name="avatar"
            id="account_avatar"
            className="form-control"
            files={avatar[0]}
            onChange={this.handleChange}
          />
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
        <input type="submit" className="btn btn-primary shadow" />
      </form>
    );
  }
}
export default ProfileForm;
