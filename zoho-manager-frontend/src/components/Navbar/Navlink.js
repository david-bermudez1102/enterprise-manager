import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navlink extends Component {
  render() {
    const { linkTo, text } = this.props
    return (
        <li className="nav-item">
          <Link to={linkTo}>{text}</Link>
        </li>
    );
  }
}

export default Navlink;
