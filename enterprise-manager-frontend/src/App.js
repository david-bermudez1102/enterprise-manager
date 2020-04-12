import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrganizations } from "./actions/organizationAction";
import { fetchAdmins } from "./actions/adminActions";
import { addSession, removeSession, fetchSession } from "./actions/sessionActions";
import Footer from "./components/Footer/Footer";
import HomeContainer from "./containers/Home/HomeContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.props
      .fetchOrganizations()
      .then(() => this.props.fetchAdmins())
      .then(() => this.props.fetchSession())
      .then(() => this.setState({ loaded: true }));
  }

  render() {
    const { organizations, admins, addSession, removeSession, session } = this.props;
    return (
      <Router>
        {this.state.loaded ? (
          <div className="bg-light container-fluid d-flex p-0 flex-column min-h-100">
            {!session.isLoggedIn && organizations.length > 0 ? (
              <Navbar session={session} organizations={organizations} />
            ) : null}
            <Switch>
              <Route
                path="/"
                render={props => (
                  <HomeContainer
                    organizations={organizations}
                    session={session}
                    {...props}
                    admins={admins}
                    addSession={addSession}
                    removeSession={removeSession}
                  />
                )}
              />
            </Switch>
            {organizations[0] && !session.isLoggedIn ? (
              <Footer organization={organizations[0]} session={session} />
            ) : null}
          </div>
        ) : null}
      </Router>
    );
  }
}

const mapStateToProps = ({ requesting, organizations, admins, session }) => {
  return {
    requesting,
    organizations,
    admins,
    session
  };
};

export default connect(mapStateToProps, {
  fetchOrganizations,
  fetchAdmins,
  fetchSession,
  addSession,
  removeSession
})(App);
