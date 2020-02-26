import React, { Component } from "react";
import Navlink from "./Navlink";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      links: [{ path: "/login", text: "Login", isActive: false }]
    };
  }

  componentDidMount() {
    const { session, organization } = this.props;
      session.isLoggedIn
        ? this.setState({
            ...this.state,
            links: [
              { path: "/home", text: "Home", isActive: false },
              { path: "/logout", text: "Logout", isActive: false },
              {
                path: `/organizations/${organization.id}/resources/new`,
                text: "Add Resource",
                isActive: false
              }
            ]
          })
        : this.setState({
            ...this.state,
            links: [{ path: "/login", text: "Login", isActive: false }]
          });
  }

  render() {
    return (
        <nav className="navbar navbar-dark bg-dark">
          {this.state.links.map((link, id) => (
            <Navlink key={id} linkTo={link.path} text={link.text} />
          ))}
        </nav>
    );
  }
}

export default Navbar;
