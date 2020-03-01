import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import OrganizationContainer from "./containers/OrganizationContainer";
import AdminContainer from "./containers/AdminContainer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrganizations } from "./actions/organizationAction";
import { fetchAdmins } from "./actions/adminActions";
import LoginContainer from "./containers/LoginContainer";
import LogoutContainer from "./containers/LogoutContainer";
import Home from "./containers/Home/Home";
import {
  addSession,
  removeSession,
  fetchSession
} from "./actions/sessionActions";
import Footer from "./components/Footer/Footer";

class App extends Component {
  componentDidMount() {
    this.props.fetchOrganizations();
    this.props.fetchAdmins();
    this.props.fetchSession();
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
        <div className="container-fluid d-flex flex-column min-vh-100">
          <Navbar session={session} organizations={organizations} />
          <main className="w-100 flex-grow-1 align-items-center justify-content-center bg-transparent py-4">
            <Switch>
              <Route exact path="/" render={() => <div>Home</div>} />
              {organizations.length > 0 ? (
                <Route path="/home">
                  <Home organization={organizations[0]} />
                </Route>
              ) : null}
              <Route
                path="/login"
                render={props => (
                  <LoginContainer
                    {...props}
                    session={session}
                    addSession={addSession}
                    organizations={organizations}
                  />
                )}
              />
              <Route path="/logout">
                <LogoutContainer removeSession={removeSession} />
              </Route>
              <Route path="/accounts/new">
                <AdminContainer organizations={organizations} admins={admins} />
              </Route>
              <Route
                path="/organizations"
                render={props => (
                  <OrganizationContainer session={session} {...props} />
                )}
              />
            </Switch>
          </main>
          {organizations.length > 0 ? (
            <Footer organization={organizations[0]} />
          ) : null}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.organizations,
    admins: state.admins,
    session: state.session
  };
};

export default connect(mapStateToProps, {
  fetchOrganizations,
  fetchAdmins,
  fetchSession,
  addSession,
  removeSession
})(App);
