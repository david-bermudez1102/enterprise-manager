import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    const { organization } = this.props;
    return (
      <footer className="page-footer bg-dark">
        <div className="footer-copyright py-5 w-100">
          <div className="container text-white">{`${organization.name} © 2020`}</div>
        </div>
      </footer>
    );
  }
}
