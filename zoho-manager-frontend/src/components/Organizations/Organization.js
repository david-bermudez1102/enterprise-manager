import React, { Component } from "react";
import { connect } from "react-redux";

class Organization extends Component {
  render() {
    const { match } = this.props;
    console.log(match)
    return (
      <>
        
      </>
    );
  }
}

export default connect()(Organization);
