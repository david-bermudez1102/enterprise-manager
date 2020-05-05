import React, { PureComponent } from "react";
import FileUploader from "../Uploader/FileUploader";
import LogoUploader from "../Uploader/LogoUploader";
import "./styles.css";
import snakecaseKeys from "snakecase-keys";

export default class OrganizationForm extends PureComponent {
  state = {
    logo: "",
    name: "",
    logoMarginLeft: 0,
    logoMarginTop: 0,
    logoWidthRatio: 0,
  };

  handleOnChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogoChange = file => {
    this.setState({
      logo: file,
    });
  };

  handleCoordinates = (x, y) => {
    this.setState({
      logoMarginLeft: x,
      logoMarginTop: y,
    });
  };

  handleLogoRatio = logoWidthRatio => {
    this.setState({ logoWidthRatio });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    const { logo, name, logoMarginLeft, logoMarginTop } = this.state;
    this.props.addOrganization({
      logo,
      ...snakecaseKeys({ name, logoMarginLeft, logoMarginTop }),
    });
  };

  render() {
    const { logoMarginLeft, logoMarginTop } = this.state;
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div className="form-group">
          <FileUploader
            className="logo-uploader bg-transparent text-center"
            size="200px"
            handleChange={this.handleLogoChange}>
            <LogoUploader
              handleCoordinates={this.handleCoordinates}
              x={logoMarginLeft}
              y={logoMarginTop}
            />
          </FileUploader>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="organization_name"
            className="form-control"
            onChange={this.handleOnChange}
            value={this.state.name}
            placeholder={"Enter the name of your organization"}
            required
          />
          <label
            className="form-control-placeholder"
            htmlFor="organization_name">
            Organization Name
          </label>
        </div>
        <hr />
        <input type="submit" className="btn btn-primary" value="Create" />
      </form>
    );
  }
}
