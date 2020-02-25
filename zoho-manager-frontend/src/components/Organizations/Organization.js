import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

class Organization extends Component {
  render() {
    const { match } = this.props;
    const { organizationId } = match.params;
    console.log(match)
    return (
      <>
        
      </>
    );
  }
}

export default connect()(Organization);
