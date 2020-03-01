import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import cuid from "cuid";

export default class Footer extends Component {
  render() {
    const { organization } = this.props;
    return (
      <footer className="page-footer row bg-dark">
        <div className="footer-copyright py-5 w-100">
          <div className="container">{`${organization.name} © 2020`}</div>
        </div>
      </footer>
    );
  }
}
