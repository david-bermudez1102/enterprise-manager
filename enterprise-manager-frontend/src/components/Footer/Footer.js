import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    const { organization } = this.props;
    return (
      <footer className="page-footer bg-secondary w-100">
        <div className="footer-copyright py-3 w-100">
          <div className="container text-white">{`${organization.name} © 2020`}</div>
        </div>
      </footer>
    );
  }
}
