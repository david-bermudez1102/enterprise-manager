import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar"
import OrganizationContainer from "./containers/OrganizationContainer";
import AdminContainer from "./containers/AdminContainer";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchOrganizations } from "./actions/organizationAction";
import { fetchAdmins } from "./actions/adminActions";
import LoginContainer from "./containers/LoginContainer";

class App extends Component {
  state = {
    organizations: [],
    admins: [],
    isLoggedIn: false,
    currentAccount: {}
  };

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

  render() {
    const { organizations, admins } = this.props;

    return (
        <Router>
          <>
            <Navbar />
            {this.state.isLoggedIn ? <Redirect push to="/home" /> : ""}
            <Route exact path="/" render={() => <div>Home</div>} />
            <Route path="/home" render={() => <div>Home</div>} />
            <Route path="/login">
              <LoginContainer
                isLoggedIn={this.state.isLoggedIn}
                setAccount={this.setAccount}
              />
            </Route>
            <Route path="/accounts/new">
              <AdminContainer organizations={organizations} admins={admins} />
            </Route>
            <Route path="/organizations/new">
              <OrganizationContainer organizations={organizations} />
            </Route>
          </>
        </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizations: state.organizations,
    admins: state.admins
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchAdmins: () => dispatch(fetchAdmins())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
