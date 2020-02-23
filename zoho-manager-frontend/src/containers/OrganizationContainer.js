import React, { Component } from "react";
import OrganizationInput from "../components/OrganizationInput";

export default class OrganizationContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <OrganizationInput />
      </div>
    );
  }
}
