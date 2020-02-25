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

class App extends Component {
  constructor() {
    super();
    this.state = {
      organizations: [],
      admins: [],
      isLoggedIn: false,
      currentAccount: {}
    };
  }

  componentDidMount() {
    this.props.fetchOrganizations();
    this.props.fetchAdmins();
    this.loginStatus();
  }

  loginStatus = () => {
    fetch("http://localhost:3001/current_user", { credentials: "include" })
      .then(response => response.json())
      .then(data => (!data.error ? this.setAccount(data.attributes) : ""));
  };

  setAccount = account =>
    this.setState({ ...this.state, isLoggedIn: true, currentAccount: account });

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      currentAccount: {}
    });
  };

  render() {
    const { organizations, admins } = this.props;

    return (
      <Router>
        <>
          {organizations.length > 0 ? (
            <Navbar
              isLoggedIn={this.state.isLoggedIn}
              organization={organizations[0]}
            />
          ) : (
            ""
          )}
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route
            path="/home"
            component={Home}
            organization={organizations[0]}
          />
          <Route
            path="/login"
            render={props => (
              <LoginContainer
                {...props}
                isLoggedIn={this.state.isLoggedIn}
                setAccount={this.setAccount}
              />
            )}
          />
          <Route path="/logout">
            <LogoutContainer handleLogout={this.handleLogout} />
          </Route>
          <Route path="/accounts/new">
            <AdminContainer organizations={organizations} admins={admins} />
          </Route>
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
        </>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.organizations,
    admins: state.admins,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchAdmins: () => dispatch(fetchAdmins())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
