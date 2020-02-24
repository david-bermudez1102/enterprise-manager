import React, { Component } from "react";
import Navlink from "./Navlink";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      links: [
        { path: "/home", text: "Home", isActive: false },
        { path: "/login", text: "Login", isActive: false }
      ]
    };
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          {this.state.links.map(link => <Navlink linkTo={link.path} text={link.text} />)}
        </nav>
      </>
    );
  }
}

export default Navbar;
