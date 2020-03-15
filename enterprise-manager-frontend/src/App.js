import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrganizations } from "./actions/organizationAction";
import { fetchAdmins } from "./actions/adminActions";
import Home from "./containers/Home/Home";
import {
  addSession,
  removeSession,
  fetchSession
} from "./actions/sessionActions";
import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    props.fetchOrganizations();
    props.fetchAdmins();
    props.fetchSession();
  }

  render() {
    const {
      organizations,
      admins,
      addSession,
      removeSession,
      session
    } = this.props;
    return (
      <Router>
        <div className="bg-light container-fluid d-flex p-0 flex-column min-h-100">
          {!session.isLoggedIn && organizations.length > 0 ? (
            <Navbar session={session} organizations={organizations} />
          ) : null}
          <Switch>
            {organizations.length > 0 ? (
              <Route
                path="/"
                render={props => (
                  <Home
                    organizations={organizations}
                    session={session}
                    {...props}
                    admins={admins}
                    addSession={addSession}
                    removeSession={removeSession}
                  />
                )}
              />
            ) : null}
          </Switch>
          {organizations[0] ? <Footer organization={organizations[0]} /> : null}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ organizations, admins, session }) => {
  return {
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
