import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import OrganizationContainer from "./containers/OrganizationContainer";
import AdminContainer from "./containers/AdminContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrganizations } from "./actions/organizationAction";
import { fetchAdmins } from "./actions/adminActions";
import LoginContainer from "./containers/LoginContainer";
import LogoutContainer from "./containers/LogoutContainer";
import Home from "./containers/Home/Home";
import { addSession, fetchSession } from "./actions/sessionActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      admins: [],
      session: props.fetchSession()
    };
  }

  componentDidMount() {
    this.props.fetchOrganizations();
    this.props.fetchAdmins();
  }

  handleLogout = () => {
    this.setState({
      ...this.state,
      isLoggedIn: false,
      currentAccount: {}
    });
  };

  render() {
    const { organizations, admins, addSession, session } = this.props;
    return (
      <Router>
        <>
          {organizations.length > 0 ? (
            <Navbar
              session={session}
              organization={organizations[0]}
            />
          ) : (
            ""
          )}
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
              />
            )}
          />
          <Route path="/logout">
            <LogoutContainer handleLogout={this.handleLogout} />
          </Route>
          <Route path="/accounts/new">
            <AdminContainer organizations={organizations} admins={admins} />
          </Route>
          {organizations.length > 0 ? (
            <Route
              path="/organizations"
              render={props => (
                <OrganizationContainer
                  isLoggedIn={this.state.isLoggedIn}
                  organizations={organizations}
                  {...props}
                />
              )}
            />
          ) : null}
        </>
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

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchAdmins: () => dispatch(fetchAdmins()),
    fetchSession: () => dispatch(fetchSession()),
    addSession: data => dispatch(addSession(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
